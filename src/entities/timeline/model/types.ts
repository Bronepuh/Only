export type TimelineEvent = { id: string; year: number; title?: string; text: string };
export type TimelinePeriod = { id: string; from: number; to: number; label: string; events: TimelineEvent[] };
