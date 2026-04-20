const revealItems = document.querySelectorAll(".reveal");
const sceneTabs = document.querySelectorAll(".scene-tab");
const scenePanels = document.querySelectorAll("[data-scene-panel]");
const faqButtons = document.querySelectorAll(".faq-item");
const journeyStops = Array.from(document.querySelectorAll("[data-stop]"));

const faqData = {
  certificates: {
    question: "Какие справки нужны?",
    answer: "Родитель получает список документов и сроков сразу после бронирования.",
    route: "Решено автоматически",
    chip: "без менеджера"
  },
  contact: {
    question: "Как связаться с ребёнком?",
    answer: "Система даёт стандартный ответ и при необходимости переводит вопрос менеджеру смены.",
    route: "Передано менеджеру",
    chip: "маршрут в CRM"
  },
  phones: {
    question: "Забираете ли вы телефоны?",
    answer: "Ответ стандартизирован по правилам лагеря и доступен сразу без ручного поиска информации.",
    route: "Решено автоматически",
    chip: "единый сценарий"
  },
  program: {
    question: "Можно ли сменить программу?",
    answer: "Такие запросы уже уходят в отдельный маршрут: тикет, проверка условий и обратный ответ родителю.",
    route: "Создан тикет в CRM",
    chip: "нужна проверка"
  }
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

sceneTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const id = tab.dataset.scene;

    sceneTabs.forEach((item) => item.classList.remove("active"));
    scenePanels.forEach((item) => item.classList.remove("active"));

    tab.classList.add("active");
    document.querySelector(`[data-scene-panel="${id}"]`).classList.add("active");
  });
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const data = faqData[button.dataset.faq];
    if (!data) {
      return;
    }

    faqButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.getElementById("chat-question").textContent = data.question;
    document.getElementById("chat-answer").textContent = data.answer;
    document.getElementById("chat-route").textContent = data.route;
    document.getElementById("chat-status-chip").textContent = data.chip;
  });
});

let activeJourneyIndex = 0;

function renderJourney(index) {
  journeyStops.forEach((stop, stopIndex) => {
    stop.classList.toggle("is-active", stopIndex === index);
  });
}

if (journeyStops.length > 0) {
  renderJourney(activeJourneyIndex);

  window.setInterval(() => {
    activeJourneyIndex = (activeJourneyIndex + 1) % journeyStops.length;
    renderJourney(activeJourneyIndex);
  }, 1400);
}
