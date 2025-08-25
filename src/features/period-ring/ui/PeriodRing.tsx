import React from "react";
import s from "./PeriodRing.module.scss";

export type RingPoint = {
	id: string;
	label: string; // "24 августа"
	dayNumber: number; // 24
};

type Props = {
	points: RingPoint[];
	activeIndex: number;
	onChange: (nextIndex: number) => void;
	size?: number;
	startAngleDeg?: number;
};

const TAU = Math.PI * 2;

export const PeriodRing: React.FC<Props> = ({ points, activeIndex, onChange, size = 530, startAngleDeg = -60 }) => {
	const radius = size / 2;
	const step = TAU / points.length;
	const rotationDeg = -activeIndex * step * (180 / Math.PI);
	const baseRad = (startAngleDeg * Math.PI) / 180;

	return (
		<div className={s.wrap} style={{ width: size, height: size }}>
			<div className={s.ringGrid} />
			<div className={s.ring} style={{ transform: `rotate(${rotationDeg}deg)` }}>
				{points.map((p, i) => {
					const isActive = i === activeIndex;
					const angle = baseRad + step * i;

					const r = radius; // строго на окружности
					const x = Math.cos(angle) * r;
					const y = Math.sin(angle) * r;

					return (
						<button
							key={p.id}
							className={isActive ? `${s.dot} ${s.active}` : s.dot}
							// ВАЖНО: вся геометрия в одном transform, без отдельного translate:
							style={{
								transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotationDeg}deg)`,
							}}
							aria-pressed={isActive}
							onClick={() => onChange(i)}
							title={p.label}
						>
							<span className={s.day} aria-hidden>
								{p.dayNumber}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default PeriodRing;
