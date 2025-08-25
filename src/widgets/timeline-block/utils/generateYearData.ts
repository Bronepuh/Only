import { TimelineEvent, TimelinePeriod } from "../model/types";

const RU_MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

const titles = ["Исторический день", "Знаковое событие", "Прорывное открытие", "Ключевой момент", "Важный рубеж", "Новая глава"];

const texts = [
	"исследователи объявили о существенном прогрессе.",
	"команда провела успешный эксперимент.",
	"было представлено инновационное решение.",
	"сообщество получило важный результат.",
	"начался новый этап работ.",
	"подтвердили гипотезу серией испытаний.",
];

// — детерминированный генератор (по желанию передай seed)
function mulberry32(seed: number) {
	return function () {
		let t = (seed += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export function generateYearData(year: number, opts?: { minYear?: number; maxYear?: number; seed?: number }): TimelinePeriod[] {
	const minYear = opts?.minYear ?? 1880;
	const maxYear = opts?.maxYear ?? new Date().getFullYear();
	const rand = mulberry32(opts?.seed ?? year);

	// определяем, високосный ли год
	const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	const daysInMonth = (m: number) => [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];

	const data: TimelinePeriod[] = [];

	for (let m = 0; m < 12; m++) {
		const dim = daysInMonth(m);
		for (let d = 1; d <= dim; d++) {
			const eventsCount = 2 + Math.floor(rand() * 5); // 2..6
			const events: TimelineEvent[] = [];

			for (let i = 0; i < eventsCount; i++) {
				const y = Math.floor(minYear + rand() * (maxYear - minYear + 1));
				const idxT = Math.floor(rand() * titles.length);
				const idxP = Math.floor(rand() * texts.length);

				events.push({
					id: `d${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}-e${String(i + 1).padStart(2, "0")}`,
					year: y,
					title: titles[idxT],
					text: `${d} ${RU_MONTHS[m]} ${y} года ${texts[idxP]}`,
				});
			}

			// сортируем события по году
			events.sort((a, b) => a.year - b.year);

			data.push({
				id: `d${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
				label: `${d} ${RU_MONTHS[m]}`,
				from: events[0].year,
				to: events[events.length - 1].year,
				events,
				day: d,
				month: m,
			});
		}
	}

	return data;
}
