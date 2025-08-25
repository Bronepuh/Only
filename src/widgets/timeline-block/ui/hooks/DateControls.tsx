import React from "react";
import s from "../TimelineBlock.module.scss";

type Props = {
	miniDM: string;
	onPrev: () => void;
	onNext: () => void;
};

export const DateControls: React.FC<Props> = ({ miniDM, onPrev, onNext }) => {
	return (
		<div className={s.controls}>
			<div className={s.ds}>
				<div className={s.dsDate}>{miniDM}</div>
				<div className={s.dsNav}>
					<button className={s.dsBtn} onClick={onPrev} aria-label="Предыдущая дата">
						<svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
							<path
								d="M15.5 5l-7 7 7 7"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<button className={s.dsBtn} onClick={onNext} aria-label="Следующая дата">
						<svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
							<path
								d="M8.5 5l7 7-7 7"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};
