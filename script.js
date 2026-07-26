const form = document.querySelector("#request-form");
const planSelect = form.querySelector("select[name='plan']");
const note = document.querySelector("#form-note");

document.querySelectorAll("[data-plan] .card-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const card = event.currentTarget.closest("[data-plan]");
    planSelect.value = card.dataset.plan;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = `Заявка на программу: ${data.get("plan")}`;
  const body = [
    `Имя: ${data.get("name")}`,
    `Контакт: ${data.get("contact")}`,
    `Формат: ${data.get("plan")}`,
    `Комментарий: ${data.get("message") || "Не указан"}`,
  ].join("\n");

  note.textContent = "Открываю письмо с заполненной заявкой.";
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
