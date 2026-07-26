const form = document.querySelector("#request-form");
const planSelect = form.querySelector("select[name='plan']");
const note = document.querySelector("#form-note");
const submitButton = form.querySelector(".submit-button");
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzRG7SnsPj6mfIqomCGIBM4yvFAa2H3kil8So0_5bFtGp-f3QhnXqx3mC9dIPBFpKs2/exec";

document.querySelectorAll("[data-plan] .card-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const card = event.currentTarget.closest("[data-plan]");
    planSelect.value = card.dataset.plan;
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!GOOGLE_SCRIPT_URL) {
    note.textContent = "Нужно добавить ссылку Google Apps Script в script.js.";
    return;
  }

  const data = new FormData(form);
  const payload = {
    name: data.get("name"),
    contact: data.get("contact"),
    plan: data.get("plan"),
    group: "от 6 до 10 человек",
    message: data.get("message") || "",
    page: window.location.href,
    createdAt: new Date().toISOString(),
  };

  submitButton.disabled = true;
  note.textContent = "Отправляю заявку.";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    form.reset();
    note.textContent = "Заявка отправлена.";
  } catch (error) {
    note.textContent = "Не получилось отправить заявку. Попробуйте еще раз.";
  } finally {
    submitButton.disabled = false;
  }
});
