# Кошелёк

Визуальный крипто-кошелёк в стиле Telegram Wallet. Приложение собирается
двумя способами:

- **PWA** — тот же HTML, устанавливается на iPhone из Safari (на экран „Домой")
- **Native .ipa** — настоящая iOS-сборка через Capacitor + GitHub Actions

## Структура

```
.
├── www/                  # web-приложение (iOS WebView грузит отсюда)
│   ├── index.html
│   ├── manifest.webmanifest
│   ├── sw.js
│   └── icon-*.png
├── assets/               # исходники для генерации иконок
│   ├── icon.png          # 1024×1024
│   ├── icon-foreground.png
│   ├── splash.png        # 2732×2732
│   └── splash-dark.png
├── capacitor.config.json # обёртка Capacitor
├── package.json          # Capacitor зависимости
└── .github/workflows/
    └── ios.yml           # сборка .ipa на macOS runner
```

## Сборка `.ipa` через GitHub Actions

Пуш в `main` или ручной запуск → macOS runner соберёт неподписанный
`Koshelek-unsigned.ipa`.

**Запустить вручную**:
Actions → *Build iOS .ipa* → **Run workflow** → ветка `main` → Run.

**Скачать результат**:
по завершении — в самом низу страницы run-а, в разделе *Artifacts*:
- `Koshelek-unsigned-ipa` — готовый `.ipa` для сайдлоада
- `Koshelek-app-bundle` — распакованный `.app` (нужен некоторым
  сайдлоадерам)

## Поставить на iPhone (сайдлоад, без Apple Developer аккаунта)

Понадобится компьютер (Mac или PC) и Apple ID.

### Вариант A — AltStore (Mac или PC)

1. Поставь [AltServer](https://altstore.io) на компьютер и приложение
   AltStore на iPhone.
2. Подключи iPhone по кабелю.
3. В AltStore на iPhone открой вкладку *My Apps* → `+` → выбери
   скачанный `Koshelek-unsigned.ipa` → введи Apple ID.
4. AltStore подпишет приложение твоим Apple ID и поставит на iPhone.

**Срок жизни:** 7 дней. Пока AltServer запущен и iPhone в одной Wi-Fi
сети с компьютером — переподписывается автоматически.

### Вариант B — Sideloadly (Mac или PC)

1. Поставь [Sideloadly](https://sideloadly.io).
2. Открой `.ipa` → выбери iPhone → введи Apple ID → Start.
3. На iPhone: Настройки → Основные → VPN и управление устройством →
   доверять профилю.

### Вариант C — Xcode (только Mac)

Если есть Mac, проще собрать локально:

```bash
npm install
npx cap add ios
npx capacitor-assets generate --ios
npx cap sync ios
npx cap open ios
```

В Xcode: подключи iPhone, выбери его как target, нажми Run. Приложение
встанет и будет работать 7 дней (бесплатный Apple ID).

## Локально запустить web-часть

```bash
cd www && python3 -m http.server 8000
```

Открыть `http://localhost:8000`.

## PWA через GitHub Pages

Settings → Pages → Source: *Deploy from branch* → `main` / `/www` → Save.
Сайт появится на `https://pochtadantov-eng.github.io/keeprs/`.
Открыть в Safari на iPhone → Поделиться → «На экран „Домой"».
