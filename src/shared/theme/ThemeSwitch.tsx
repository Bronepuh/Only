import React, { useEffect, useState } from "react";
import s from "./ThemeSwitch.module.scss";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(t: Theme) {
	document.documentElement.setAttribute("data-theme", t);
	try {
		localStorage.setItem("theme", t);
	} catch {}
}

export const ThemeSwitch: React.FC<{ className?: string }> = ({ className }) => {
	const [theme, setTheme] = useState<Theme>("light");
	const isDark = theme === "dark";

	useEffect(() => {
		// первичная инициализация (учтёт ThemeScript, если его нет)
		const stored = typeof window !== "undefined" ? (localStorage.getItem("theme") as Theme | null) : null;
		const initial = stored || getSystemTheme();
		setTheme(initial);
		applyTheme(initial);
	}, []);

	// синхронизация между вкладками
	useEffect(() => {
		const onStorage = (e: StorageEvent) => {
			if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
				setTheme(e.newValue);
				applyTheme(e.newValue);
			}
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);

	const toggle = () => {
		const next: Theme = isDark ? "light" : "dark";
		setTheme(next);
		applyTheme(next);
		console.log(next);
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="Переключить тему"
			aria-pressed={isDark}
			className={`${s.switch} ${isDark ? s.dark : ""} ${className || ""}`}
		>
			<span className={s.iconSun} aria-hidden>
				☀️
			</span>
			<span className={s.iconMoon} aria-hidden>
				🌙
			</span>
			<span className={s.knob} aria-hidden />
		</button>
	);
};

export default ThemeSwitch;
