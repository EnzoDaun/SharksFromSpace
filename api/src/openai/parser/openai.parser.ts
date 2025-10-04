import { Injectable } from '@nestjs/common';
import { OpenAIAnalysis, OpenAIMessagesParams, RiskLevel } from '../interfaces/openai-analysis.interface';

@Injectable()
export class OpenAIParser {
  /**
   * Monta as mensagens para Chat Completions com duas imagens (clorofila + SST).
   * Força saída JSON via instrução + usaremos response_format: json_object na integração.
   */
  buildMessages(params: OpenAIMessagesParams) {
    const { time, chlorophyllDataUrl, sstDataUrl, regionHint } = params;

    const system =
      'You are a senior oceanography and marine ecology analyst. Analyze phytoplankton (chlorophyll-a) and sea surface temperature (SST) maps to infer short-term shark presence likelihood. Be concise, evidence-based, and return ONLY valid JSON matching the required schema.';

    const userText = [
      'Context:',
      `- Date (UTC): ${time}`,
      regionHint ? `- Region hint: ${regionHint}` : undefined,
      '- Inputs: (1) Global chlorophyll-a map; (2) Global SST map.',
      '- Task: Estimate shark presence likelihood for the next 1–3 days considering overlap between high chlorophyll (prey availability) and suitable SST for common prey (often ~18–26°C; acknowledge regional variability).',
      '- Constraints: Be conservative, indicate uncertainty, avoid fabricated numbers. Output JSON only.',
      '',
      'Output JSON schema (no extra text):',
      '{',
      '  "summary": string,',
      '  "riskLevel": "low" | "medium" | "high",',
      '  "confidence": number,',
      '  "drivers": string[],',
      '  "hotspots": string[],',
      '  "disclaimers": string[]',
      '}',
    ]
      .filter(Boolean)
      .join('\n');

    // Garantimos que as imagens sejam Data URLs válidas
    const chla = this.ensurePngDataUrl(chlorophyllDataUrl);
    const sst = this.ensurePngDataUrl(sstDataUrl);

    // Formato compatível com Chat Completions multimodal
    return [
      { role: 'system', content: system },
      {
        role: 'user',
        content: [
          { type: 'text', text: userText },
          { type: 'image_url', image_url: { url: chla } },
          { type: 'image_url', image_url: { url: sst } },
        ],
      },
    ];
  }

  /**
   * Tenta converter a resposta em OpenAIAnalysis, com proteções contra:
   * - resposta não JSON
   * - code fences
   * - campos fora do domínio
   */
  safeParse(content: string): OpenAIAnalysis {
    const cleaned = this.stripFences(content?.trim() ?? '');

    try {
      const raw = JSON.parse(cleaned);

      // Normalizações/validações leves
      const summary = this.asString(raw.summary, 'Analysis unavailable.');
      const riskLevel = this.asRisk(raw.riskLevel);
      const confidence = this.asConfidence(raw.confidence);

      const drivers = this.asStringArray(raw.drivers);
      const hotspots = this.asStringArray(raw.hotspots);
      const disclaimers = this.asStringArray(raw.disclaimers);

      return { summary, riskLevel, confidence, drivers, hotspots, disclaimers };
    } catch {
      return {
        summary: 'Analysis unavailable — model did not return valid JSON.',
        riskLevel: 'low',
        confidence: 0.2,
        drivers: [],
        hotspots: [],
        disclaimers: ['Model returned non-JSON or invalid schema.'],
      };
    }
  }

  // -------------------
  // helpers internos
  // -------------------

  private ensurePngDataUrl(s: string): string {
    const trimmed = (s ?? '').trim();
    if (!trimmed) return 'data:image/png;base64,';
    const isDataUrl = /^data:image\/png;base64,/i.test(trimmed);
    if (isDataUrl) return trimmed;
    // se veio só o base64 (sem prefixo), prefixamos como PNG
    const looksBase64 = /^[A-Za-z0-9+/=]+$/.test(trimmed.replace(/\s+/g, ''));
    if (looksBase64) return `data:image/png;base64,${trimmed}`;
    // se já é uma URL http(s), também deixamos passar (OpenAI aceita URLs públicas)
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    // fallback seguro
    return 'data:image/png;base64,';
  }

  private stripFences(s: string): string {
    // remove ```json ... ``` ou ``` ... ```
    return s.replace(/^```(?:json)?\s*([\s\S]*?)\s*```$/i, '$1').trim();
  }

  private asString(v: unknown, fallback = ''): string {
    return typeof v === 'string' && v.trim().length > 0 ? v : fallback;
  }

  private asRisk(v: unknown): RiskLevel {
    const s = typeof v === 'string' ? v.toLowerCase() : '';
    if (s === 'high' || s === 'medium' || s === 'low') return s;
    return 'low';
  }

  private asConfidence(v: unknown): number {
    const n = typeof v === 'number' ? v : Number.NaN;
    if (Number.isFinite(n)) return Math.min(1, Math.max(0, n));
    return 0.2;
  }

  private asStringArray(v: unknown): string[] {
    if (!Array.isArray(v)) return [];
    return v
      .map((x) => (typeof x === 'string' ? x.trim() : ''))
      .filter((x) => x.length > 0);
  }
}
