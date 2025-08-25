# Create a README.md file with the requested content

readme = """# Исторические даты

React + TypeScript + SCSS + **Webpack**. Независимый виджет с кольцом временных отрезков и слайдером событий (**Swiper**). Архитектура —
**Feature-Sliced Design (FSD)**. Реализована **светлая/тёмная тема** (CSS Custom Properties + переключатель).

---

## Поднятие проекта

-   yarn (установка зависимостей)
-   yarn dev (поднятие в режиме разработки)
-   yarn build (сборка)

## ✨ Возможности

-   **Кольцо временных отрезков (2–6)**
    -   точки равномерно распределены по окружности;
    -   клики/клавиатура меняют активный отрезок и синхронно обновляют контент (крупные числа «от/до» и слайдер ниже).
-   **Слайдер событий**
    -   Swiper: брейкпоинты, стрелки, буллет‑пагинация; на мобайле — свайп и компактная типографика.
-   **Независимость блока**
    -   можно отрендерить на странице несколько виджетов — логика и стили не конфликтуют.
-   **Линии из макета — часть вёрстки**
    -   вертикальные границы контейнера и горизонтальная линия сцены реализованы в CSS.
-   **Тема**
    -   светлая/тёмная; плавные переходы, сохранение выбора пользователя.
-   **Типизация**
    -   строгие модели данных временных отрезков и событий (TypeScript).

---

## 🧱 Архитектура (FSD)

<details>
<summary><strong>Структура проекта</strong></summary>

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
│  │        ├─ PeriodRing.module.scss
│  │        ├─ PeriodRing.tsx
│  │        └─ index.ts
│  ├─ shared/
│  │  ├─ lib/
│  │  │  └─ polar.ts
│  │  ├─ styles/
│  │  │  └─ variables.scss
│  │  └─ theme/
│  │     ├─ ThemeSwitch.module.scss
│  │     └─ ThemeSwitch.tsx
│  ├─ styles/
│  │  ├─ global.scss
│  │  └─ types/
│  │     └─ styles.d.ts
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
│  │     │  ├─ TimelineBlock.module.scss
│  │     │  ├─ TimelineBlock.tsx
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
