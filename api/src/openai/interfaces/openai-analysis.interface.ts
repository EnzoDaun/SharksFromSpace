export type RiskLevel = 'low' | 'medium' | 'high';

export interface OpenAIAnalysis {
  summary: string;
  riskLevel: RiskLevel;
  confidence: number;
  drivers?: string[];
  hotspots?: string[];
  disclaimers?: string[];
}

/** Parameters for building messages sent to OpenAI */
export interface OpenAIMessagesParams {
  time: string;
  chlorophyllDataUrl: string;
  sstDataUrl: string;
  regionHint?: string;
}
