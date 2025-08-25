export type TimelineEvent = {
	id: string;
	year: number;
	title: string;
	text: string;
};

export type TimelinePeriod = {
	id: string; // например "d01-01"
	label: string; // "1 января"
	from: number; // минимальный год в событиях
	to: number; // максимальный год в событиях
	events: TimelineEvent[];
	day: number; // 1..31
	month: number; // 0..11
};
