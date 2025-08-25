import React from "react";
import s from "../TimelineBlock.module.scss";
import { TimelinePeriod } from "../../model/types";

type Props = {
	activePeriod?: TimelinePeriod;
};

export const RangeOverlay: React.FC<Props> = ({ activePeriod }) => {
	if (!activePeriod) return null;
	return (
		<div className={s.rangeOverlay} aria-hidden>
			<span className={s.from}>{activePeriod.from}</span>
			<span className={s.to}>{activePeriod.to}</span>
		</div>
	);
};
