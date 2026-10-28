# Кошелёк

Визуальный прототип крипто-кошелька в стиле Telegram Wallet — одностраничный PWA.

## Открыть на iPhone

1. Открой адрес сайта в Safari.
2. Нажми «Поделиться» → «На экран „Домой"».
3. Запускай с иконки — приложение открывается во весь экран, работает оффлайн.

## Что внутри

- `index.html` — всё приложение (HTML + CSS + JS)
- `manifest.webmanifest` — манифест PWA (имя, иконки, standalone)
- `sw.js` — service worker, кэширует страницу для оффлайна
- `icon-*.png` — иконки для домашнего экрана и установки
- `.nojekyll` — отключает обработку Jekyll на GitHub Pages

## Локально

Любой статичный сервер:

```bash
python3 -m http.server 8000
```

Открыть `http://localhost:8000`.

## Деплой на GitHub Pages

Settings → Pages → Source: Deploy from branch → `main` / `/ (root)` → Save.
Сайт появится по адресу `https://pochtadantov-eng.github.io/keeprs/`.
