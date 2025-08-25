import React from "react";
import s from "../TimelineBlock.module.scss";
import { TimelinePeriod } from "../../model/types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
	activePeriod: TimelinePeriod;
	miniDM: string;
	onPrev: () => void;
	onNext: () => void;
};

export const EventsSlider: React.FC<Props> = ({ activePeriod, miniDM, onPrev, onNext }) => {
	return (
		<div className={s.sliderWrap}>
			<button className={`${s.swNav} ${s.swPrev} timeline-prev`} aria-label="Слайд назад">
				<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
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
			<button className={`${s.swNav} ${s.swNext} timeline-next`} aria-label="Слайд вперёд">
				<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
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

			<Swiper
				className={s.swiper}
				modules={[Navigation, Pagination, A11y]}
				navigation={{ prevEl: ".timeline-prev", nextEl: ".timeline-next" }}
				pagination={{
					el: ".timeline-pagination",
					clickable: true,
					dynamicBullets: true,
				}}
				speed={480}
				spaceBetween={24}
				slidesPerView={3} // базовое значение для десктопа
				watchOverflow
				breakpoints={{
					0: {
						slidesPerView: 1.5,
						slidesOffsetBefore: 16,
						slidesOffsetAfter: 16,
					},
					600: { slidesPerView: 2, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
					960: { slidesPerView: 3 },
					1280: { slidesPerView: 3 },
					1440: { slidesPerView: 3 },
				}}
			>
				{activePeriod.events.map((ev) => (
					<SwiperSlide key={ev.id} className={s.slide}>
						<article className={s.card}>
							<div className={s.year}>{ev.year}</div>
							<p className={s.cardText}>{ev.text}</p>
						</article>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Мобильная пагинация + дублируемые стрелки */}
			<div className={s.mobilePagination}>
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
				<div className={`${s.swPagination} timeline-pagination`} />
			</div>
		</div>
	);
};
