import { useEffect, useState } from "react";

/**
 * Возвращает число (px) в зависимости от media-query.
 * @param desktop значение по умолчанию
 * @param mobile значение для mobile
 * @param query CSS media query (напр. "(max-width: 600px)")
 */
export function useResponsiveRingSize(desktop = 530, mobile = 340, query = "(max-width: 600px)") {
	const [size, setSize] = useState<number>(desktop);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const mq = window.matchMedia(query);
		const apply = () => setSize(mq.matches ? mobile : desktop);

		apply();
		mq.addEventListener?.("change", apply);
		return () => mq.removeEventListener?.("change", apply);
	}, [desktop, mobile, query]);

	return size;
}
