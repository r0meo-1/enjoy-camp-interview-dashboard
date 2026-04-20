const stage = document.getElementById("lead-stage");
const steps = Array.from(document.querySelectorAll(".story-step"));
const replayButton = document.getElementById("replay-demo");
const stepLabel = document.getElementById("visual-step-label");
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

function renderStep(index) {
  const item = stepContent[index];
  if (!item) {
    return;
  }

  activeStep = index;
  stage.dataset.step = String(item.step);
  stepLabel.textContent = item.label;
  submitStatus.textContent = item.submit;
  crmStatus.textContent = item.crm;
  managerRoute.textContent = item.route;
  catalogNote.textContent = item.catalog;
  quizNote.textContent = item.quiz;
  crmNote.textContent = item.crmNote;
  benefitStatus.textContent = item.benefit;

  steps.forEach((step, stepIndex) => {
    step.classList.toggle("active", stepIndex === index);
  });

  routeNodes.forEach((node, nodeIndex) => {
    node.classList.toggle("active", nodeIndex <= item.routeActive);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

    if (!visibleEntry) {
      return;
    }

    const nextStep = Number(visibleEntry.target.dataset.step);
    if (!Number.isNaN(nextStep) && nextStep !== activeStep) {
      renderStep(nextStep);
    }
  },
  {
    rootMargin: "-24% 0px -30% 0px",
    threshold: [0.25, 0.5, 0.75]
  }
);

steps.forEach((step) => observer.observe(step));

replayButton.addEventListener("click", () => {
  const firstStep = steps[0];
  renderStep(0);

  if (firstStep) {
    firstStep.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
});

renderStep(0);
