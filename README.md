# Исторические даты

React + TypeScript + SCSS + **Webpack**. Независимый виджет с кольцом временных отрезков и слайдером событий (**Swiper**). Архитектура —
**Feature-Sliced Design (FSD)**. Реализована **светлая/тёмная тема** (CSS Custom Properties + переключатель).

---

## Поднятие проекта

-   yarn — установка зависимостей
-   yarn dev — поднятие в режиме разработки (webpack-dev-server)
-   yarn build — продакшн‑сборка

---

## ✨ Возможности

-   **Кольцо временных отрезков (2–6)**
    -   точки равномерно распределены по окружности;
    -   клики/клавиатура меняют активный отрезок, синхронно обновляя числа «от/до» и слайдер.
-   **Слайдер событий**
    -   Swiper: брейкпоинты, навигация стрелками, буллет‑пагинация; на мобайле — свайп.
-   **Независимость блока**
    -   можно разместить на странице несколько экземпляров — логика и стили не конфликтуют.
-   **Линии из макета — часть вёрстки**
    -   вертикальные границы контейнера и горизонтальная линия сцены реализованы в CSS.
-   **Тема**
    -   светлая/тёмная, плавные переходы, сохранение выбора пользователя.
-   **Типизация**
    -   строгие модели данных временных отрезков и событий (TypeScript).

---

## 🧱 Архитектура (FSD)

**Структура проекта**

```text
.
├─ public/
│  └─ index.html
├─ src/
│  ├─ entities/
│  │  └─ timeline/
│  │     └─ model/
│  │        └─ types.ts
│  ├─ features/
│  │  └─ period-ring/
│  │     ├─ lib/
│  │     │  └─ calcPositions.ts
│  │     └─ ui/
│  │        ├─ PeriodRing.tsx
│  │        ├─ PeriodRing.module.scss
│  │        └─ index.ts
│  ├─ shared/
│  │  ├─ lib/
│  │  │  └─ polar.ts
│  │  ├─ styles/
│  │  │  └─ variables.scss
│  │  └─ theme/
│  │     ├─ ThemeSwitch.tsx
│  │     └─ ThemeSwitch.module.scss
│  ├─ styles/
│  │  └─ global.scss
│  ├─ types/
│  │  └─ styles.d.ts
│  ├─ widgets/
│  │  └─ timeline-block/
│  │     ├─ model/
│  │     │  └─ types.ts
│  │     ├─ ui/
│  │     │  ├─ hooks/
│  │     │  │  ├─ DateControls.tsx
│  │     │  │  ├─ useResponsiveRingSize.ts
│  │     │  │  └─ useRingData.ts
│  │     │  ├─ parts/
│  │     │  │  ├─ EventsSlider.tsx
│  │     │  │  ├─ RangeOverlay.tsx
│  │     │  │  └─ index.ts
│  │     │  ├─ TimelineBlock.tsx
│  │     │  ├─ TimelineBlock.module.scss
│  │     │  └─ index.ts
│  │     └─ utils/
│  │        └─ generateYearData.ts
│  ├─ App.tsx
│  └─ index.tsx
├─ webpack.common.js
├─ webpack.dev.js
├─ webpack.prod.js
├─ tsconfig.json
├─ package.json
└─ yarn.lock
```

---

## 🧩 Задание и соответствие

**Описание**

Реализовать блок по макету: кольцо временных отрезков, в каждом — несколько событий. При переключении меняются соответствующие числа
«от/до», а под ними показывается новый слайдер с подробной информацией по ключевым событиям активного временного отрезка.

Диапазон — **от 2 до 6** отрезков. Все интерактивные точки располагаются на окружности **на одинаковом расстоянии**. Блок должен быть
**независимым**: несколько экземпляров на странице работают корректно. **Все линии** в макете — это часть вёрстки.

**Требования**

-   TypeScript
-   React или нативный JS (здесь — **React + TS**)
-   SASS/SCSS
-   Webpack
-   Swiper (для слайдеров)
-   Допустим gsap для анимаций

**Нельзя**: jQuery; Bootstrap/Tailwind; UI‑библиотеки (MUI/AntD и т.п.).

**Как реализовано здесь**

-   TS‑модели: `entities/timeline/model/types.ts`, `widgets/timeline-block/model/types.ts`
-   SCSS‑модули + глобальные токены темы (`shared/styles/variables.scss`)
-   Webpack: dev/prod конфиги
-   Swiper: слайдер событий с брейкпоинтами, стрелками и буллетами
-   Геометрия кольца: полярные координаты, равномерное распределение точек (`features/period-ring/lib/calcPositions.ts`)
-   Линии макета: вертикальные/горизонтальные — через CSS‑границы и псевдоэлементы
-   Независимость: виджет можно рендерить многократно
-   Темизация: светлая/тёмная тема + переключатель (`shared/theme/ThemeSwitch.tsx`)

---

## ⚙️ Стек

-   **React 18**, **TypeScript**
-   **SCSS / SASS**
-   **Webpack**
-   **Swiper**
-   (опционально) **gsap**

---

## ▶️ Пример использования

```tsx
import { TimelineBlock } from "@/widgets/timeline-block/ui";
import type { TimelinePeriod } from "@/widgets/timeline-block/model/types";

const data: TimelinePeriod[] = [
	{
		id: "d08-25",
		day: 25,
		month: 7,
		label: "25 августа",
		from: "1899",
		to: "1957",
		events: [
			{ id: "e1", year: 1899, text: "Начался новый этап работ." },
			{ id: "e2", year: 1916, text: "Подтверждена гипотеза серией испытаний." },
			{ id: "e3", year: 1957, text: "Завершение серии испытаний." },
		],
	},
];

export const Page = () => <TimelineBlock data={data} ringCount={6} />;
```
