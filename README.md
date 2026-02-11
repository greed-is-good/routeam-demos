# Routeam Demos

Коллекция демо-проектов для презентаций и пилотов Routeam.

## Публичные ссылки (GitHub Pages)

- Главная страница демо: `https://greed-is-good.github.io/routeam-demos/`
- CityFeedback: `https://greed-is-good.github.io/routeam-demos/comment-statistics-ui/`
- Flora Guard: `https://greed-is-good.github.io/routeam-demos/flora-guard-mvp/`

## Структура

- `comment-statistics-ui` - админ-панель CityFeedback (MVP 1.0)
- `flora-guard-mvp` - демо-лендинг Flora Guard

## Быстрый старт

### comment-statistics-ui

```bash
cd comment-statistics-ui
npm install
npm run dev
```

### flora-guard-mvp

Откройте `flora-guard-mvp/index.html` в браузере.

## Деплой в GitHub Pages

Публикация выполняется единым скриптом: оба проекта попадают в ветку `gh-pages` в разные подпапки.

```bash
npm install
npm run deploy:pages
```

Требование в GitHub:
- `Settings -> Pages`
- `Source: Deploy from a branch`
- `Branch: gh-pages / (root)`
