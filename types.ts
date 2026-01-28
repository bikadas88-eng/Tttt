export enum AppView {
  DASHBOARD = 'DASHBOARD',
  TRENDS = 'TRENDS',
  IDEAS = 'IDEAS',
  SCRIPT = 'SCRIPT',
  METADATA = 'METADATA'
}

export interface TrendItem {
  topic: string;
  relevance: string;
  sourceUrl?: string;
  sourceTitle?: string;
}

export interface VideoIdea {
  title: string;
  hook: string;
  viralScore: number;
  targetAudience: string;
}

export interface VideoMetadata {
  titles: string[];
  description: string;
  tags: string[];
  thumbnailPrompt: string;
}

export interface ScriptSection {
  heading: string;
  content: string;
  duration: string;
}

export interface FullScript {
  title: string;
  sections: ScriptSection[];
}
