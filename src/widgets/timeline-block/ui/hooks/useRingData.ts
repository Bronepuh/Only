import { useMemo } from "react";
import { TimelinePeriod } from "../../model/types";

function dmKey(day: number, month: number) {
	return `d${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

type Args = {
	data: TimelinePeriod[];
	ringCount: number;
	offsetDays: number;
	today: Date;
};

export function useRingData({ data, ringCount, offsetDays, today }: Args) {
	const ringPeriods = useMemo(() => {
		const arr: TimelinePeriod[] = [];
		for (let i = 0; i < ringCount; i++) {
			const d = new Date(today);
			d.setDate(today.getDate() + offsetDays + i);
			const key = dmKey(d.getDate(), d.getMonth());
			const p = data.find((x) => x.id === key);
			if (p) arr.push(p);
		}
		return arr;
	}, [data, ringCount, offsetDays, today]);

	return { ringPeriods };
}
