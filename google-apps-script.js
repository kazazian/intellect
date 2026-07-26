const SHEET_NAME = "Заявки";

function doPost(event) {
  const sheet = getSheet();
  const data = JSON.parse(event.postData.contents || "{}");

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.contact || "",
    data.plan || "",
    data.group || "от 6 до 10 человек",
    data.message || "",
    data.page || "",
    data.createdAt || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Дата получения",
      "Имя",
      "Контакт",
      "Формат",
      "Группа",
      "Комментарий",
      "Страница",
      "Время на сайте",
    ]);
  }

  return sheet;
}
