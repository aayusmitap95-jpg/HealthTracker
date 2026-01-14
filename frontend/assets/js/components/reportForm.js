// frontend/assets/js/components/reportForm.js
import { $ } from "../utils/dom.js";

export function resetReportForm() {
  $("reportForm").reset();
}

export function fillReportForm(data) {
  $("name").value = data.name ?? "";
  $("age").value = data.age ?? "";
  $("height").value = data.height ?? "";
  $("weight").value = data.weight ?? "";
  $("gender").value = data.gender ?? "";
  $("steps").value = data.steps ?? "";
  $("water_intake").value = data.water_intake ?? "";
  $("calories_burned").value = data.calories_burned ?? "";
  $("disease").value = data.disease ?? "";
  $("genetic_disease").value = data.genetic_disease ?? "";
  $("allergies").value = data.allergies ?? "";
}
