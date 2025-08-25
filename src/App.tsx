import { useMemo } from "react";
import "./styles/global.scss";
import "swiper/css";
import TimelineBlock from "./widgets/timeline-block/ui/TimelineBlock";
import { generateYearData } from "./widgets/timeline-block/utils/generateYearData";

function App() {
	const year = new Date().getFullYear();
	const data = useMemo(() => generateYearData(year, { seed: 1234 }), [year]);

	return (
		<div>
			<TimelineBlock data={data} />
		</div>
	);
}

export default App;
