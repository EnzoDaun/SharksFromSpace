export type RiskLevel = 'low' | 'medium' | 'high';

export interface OpenAIAnalysis {
  summary: string;        // resumo preditivo
  riskLevel: RiskLevel;   // nível de risco qualitativo
  confidence: number;     // 0..1
  drivers?: string[];     // fatores/indicadores usados
  hotspots?: string[];    // áreas/zonas de atenção (se houver)
  disclaimers?: string[]; // observações e limitações
}

/** Parâmetros para montar as mensagens enviadas à OpenAI */
export interface OpenAIMessagesParams {
  time: string;                // YYYY-MM-DD
  chlorophyllDataUrl: string;  // data:image/png;base64,....
  sstDataUrl: string;          // data:image/png;base64,....
  regionHint?: string;         // opcional: nome curto da região (se quiser)
}
