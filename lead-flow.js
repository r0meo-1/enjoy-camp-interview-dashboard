const stage = document.getElementById("lead-stage");
const replayButton = document.getElementById("replay-demo");
const prevButton = document.getElementById("prev-step");
const nextButton = document.getElementById("next-step");
const stepButtons = Array.from(document.querySelectorAll("[data-step-button]"));
const stepLabel = document.getElementById("visual-step-label");
const stepIndex = document.getElementById("step-index");
const stepTitle = document.getElementById("step-title");
const stepChips = document.getElementById("step-chips");
const submitStatus = document.getElementById("submit-status");
const crmStatus = document.getElementById("crm-status");
const managerRoute = document.getElementById("manager-route");
const catalogNote = document.getElementById("catalog-note");
const quizNote = document.getElementById("quiz-note");
const crmNote = document.getElementById("crm-note");
const benefitStatus = document.getElementById("benefit-status");
const routeNodes = Array.from(document.querySelectorAll(".route-node"));

const stepContent = [
  {
    step: 0,
    label: "Шаг 1 из 6",
    index: "01",
    title: "Каталог перегружает выбор",
    chips: ["73+ смен", "много вариантов", "сырой запрос"],
    submit: "Форма ещё не активна",
    crm: "Ожидание вебхука",
    route: "Менеджер ещё не подключён",
    catalog: "Шумный вход",
    quiz: "Ждёт ввода",
    crmNote: "Карточки ещё нет",
    benefit: "Эффект ещё не раскрыт",
    routeActive: 0
  },
  {
    step: 1,
    label: "Шаг 2 из 6",
    index: "02",
    title: "Включается умная форма",
    chips: ["возраст", "интерес", "локация", "смена"],
    submit: "Контекст собирается",
    crm: "Ожидание вебхука",
    route: "Маршрут готовится",
    catalog: "Фильтры сужают выбор",
    quiz: "Возраст, интерес, локация",
    crmNote: "CRM ждёт данные",
    benefit: "Снижается шум на входе",
    routeActive: 1
  },
  {
    step: 2,
    label: "Шаг 3 из 6",
    index: "03",
    title: "Данные уходят через вебхук",
    chips: ["без ручного копирования", "один маршрут"],
    submit: "Данные ушли в вебхук",
    crm: "Передача в систему",
    route: "Ручное копирование не нужно",
    catalog: "Запрос очищен от шума",
    quiz: "Контекст собран",
    crmNote: "Пакет данных в пути",
    benefit: "Меньше потерь на передаче",
    routeActive: 2
  },
  {
    step: 3,
    label: "Шаг 4 из 6",
    index: "04",
    title: "В amoCRM создаётся лид",
    chips: ["карточка", "источник", "статус"],
    submit: "Лид создан",
    crm: "Карточка в amoCRM",
    route: "Есть источник и статус",
    catalog: "Каталог уже не точка потери",
    quiz: "Сценарий отработал",
    crmNote: "Лид создан автоматически",
    benefit: "CRM становится чище",
    routeActive: 3
  },
  {
    step: 4,
    label: "Шаг 5 из 6",
    index: "05",
    title: "Появляются теги и маршрутизация",
    chips: ["сегменты", "автотеги", "назначение"],
    submit: "Теги проставлены",
    crm: "Сегментация готова",
    route: "Назначение по контексту",
    catalog: "Сигнал структурирован",
    quiz: "Квалификация завершена",
    crmNote: "Теги и маршрут готовы",
    benefit: "Быстрее квалификация",
    routeActive: 4
  },
  {
    step: 5,
    label: "Шаг 6 из 6",
    index: "06",
    title: "Менеджер получает готовый запрос",
    chips: ["меньше потерь", "быстрее ответ", "чище CRM", "выше шанс брони"],
    submit: "Лид квалифицирован",
    crm: "Лид доставлен без потерь",
    route: "Менеджер получает готовый запрос",
    catalog: "Потери на входе снижены",
    quiz: "Контекст сохранён",
    crmNote: "Готово к быстрому отклику",
    benefit: "Выше шанс брони",
    routeActive: 5
  }
];

let activeStep = 0;

function renderChips(chips) {
  stepChips.innerHTML = "";
  chips.forEach((chip) => {
    const item = document.createElement("span");
    item.textContent = chip;
    stepChips.appendChild(item);
  });
}

function renderStep(index) {
  const item = stepContent[index];
  if (!item) {
    return;
  }

  activeStep = index;
  stage.dataset.step = String(item.step);
  stepLabel.textContent = item.label;
  stepIndex.textContent = item.index;
  stepTitle.textContent = item.title;
  renderChips(item.chips);
  submitStatus.textContent = item.submit;
  crmStatus.textContent = item.crm;
  managerRoute.textContent = item.route;
  catalogNote.textContent = item.catalog;
  quizNote.textContent = item.quiz;
  crmNote.textContent = item.crmNote;
  benefitStatus.textContent = item.benefit;

  stepButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === index);
  });

  routeNodes.forEach((node, nodeIndex) => {
    node.classList.toggle("active", nodeIndex <= item.routeActive);
  });

  prevButton.disabled = index === 0;
  nextButton.disabled = index === stepContent.length - 1;
}

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderStep(Number(button.dataset.stepButton));
  });
});

prevButton.addEventListener("click", () => {
  if (activeStep > 0) {
    renderStep(activeStep - 1);
  }
});

nextButton.addEventListener("click", () => {
  if (activeStep < stepContent.length - 1) {
    renderStep(activeStep + 1);
  }
});

replayButton.addEventListener("click", () => {
  renderStep(0);
});

renderStep(0);
