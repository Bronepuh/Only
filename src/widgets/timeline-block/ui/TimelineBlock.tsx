import React, { useMemo, useState } from "react";
import s from "./TimelineBlock.module.scss";
import ThemeSwitch from "@/shared/theme/ThemeSwitch";
import { PeriodRing, RingPoint } from "@/features/period-ring/ui";

import { useResponsiveRingSize } from "./hooks/useResponsiveRingSize";
import { useRingData } from "./hooks/useRingData";
import { RangeOverlay } from "./parts/RangeOverlay";
import { EventsSlider } from "./parts/EventsSlider";
import { TimelinePeriod } from "../model/types";
import { DateControls } from "./hooks/DateControls";

type Props = {
	data: TimelinePeriod[];
	ringCount?: number; // 6
};

export const TimelineBlock: React.FC<Props> = ({ data, ringCount = 6 }) => {
	const today = useMemo(() => new Date(), []);
	const [offsetDays, setOffsetDays] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);

	// адаптивный размер кольца
	const ringSize = useResponsiveRingSize(530, 340, "(max-width: 600px)");

	// периоды для текущего окна и точки на кольце
	const { ringPeriods } = useRingData({ data, ringCount, offsetDays, today });

	const ringPoints: RingPoint[] = ringPeriods.map((p) => ({
		id: p.id,
		label: p.label,
		dayNumber: p.day,
	}));

	const activePeriod = ringPeriods[activeIndex];

	const prev = () => {
		if (activeIndex > 0) setActiveIndex((i) => i - 1);
		else setOffsetDays((v) => v - 1);
	};

	const next = () => {
		if (activeIndex < ringCount - 1) setActiveIndex((i) => i + 1);
		else setOffsetDays((v) => v + 1);
	};

	const miniDM = activePeriod ? `${String(activePeriod.day).padStart(2, "0")}/${String(activePeriod.month + 1).padStart(2, "0")}` : "";

	return (
		<section className={s.block}>
			<div className={s.container}>
				<ThemeSwitch className={s.themeToggle} />

				{/* Заголовок */}
				<div className={s.header}>
					<span className={s.titleBar} aria-hidden />
					<h2 className={s.title}>
						Исторические <br />
						даты
					</h2>
				</div>

				{/* Тело */}
				<div className={s.wrapper}>
					<div className={s.stage}>
						<RangeOverlay activePeriod={activePeriod} />

						<div className={s.ringHolder}>
							<PeriodRing
								points={ringPoints}
								activeIndex={activeIndex}
								onChange={setActiveIndex}
								size={ringSize}
								startAngleDeg={-60}
							/>
						</div>

						{/* Переключатель дат (десктоп) */}
						<DateControls miniDM={miniDM} onPrev={prev} onNext={next} />
					</div>

					{/* Слайдер событий */}
					{activePeriod && <EventsSlider activePeriod={activePeriod} miniDM={miniDM} onPrev={prev} onNext={next} />}
				</div>
			</div>
		</section>
	);
};

export default TimelineBlock;
