# enjoy-camp-interview-dashboard

Премиальный одностраничный сайт-презентация на русском языке для собеседования в Enjoy Camp на позицию специалиста технической поддержки / CRM / IT-сопровождения.

## Структура

```text
.
├─ index.html
├─ pain-map.html
├─ lead-flow.html
├─ styles.css
├─ script.js
├─ pain-map.css
├─ pain-map.js
├─ lead-flow.css
├─ lead-flow.js
├─ favicon.svg
└─ README.md
```

## Как открыть локально

1. Откройте `index.html` в браузере.
2. Для более корректной проверки можно поднять простой статический сервер:

```powershell
python -m http.server 8000
```

После этого откройте `http://localhost:8000`.

## Как задеплоить на GitHub Pages

1. Загрузите файлы в ветку `main`.
2. В GitHub откройте `Settings -> Pages`.
3. Выберите `Deploy from a branch`.
4. Укажите `main` и папку `/ (root)`.
5. Сохраните и дождитесь публикации.

## Что уже включено

- адаптивная одностраничная структура без сборки;
- sticky navigation и активный индикатор секций;
- reveal-анимации и animated counters;
- интерактивный блок кейсов;
- отдельная интерактивная страница `pain-map.html` со сценами по лидам, поддержке, оплатам и повторным продажам;
- отдельная страница `lead-flow.html` со scroll-storytelling сценой пути лида от каталога до amoCRM;
- тёмная премиальная визуальная система;
- мета-теги и favicon;
- готовность к публикации на GitHub Pages.

## Что желательно заменить перед показом

- `your@email.com` в `index.html`;
- `your_telegram` в `index.html`.
