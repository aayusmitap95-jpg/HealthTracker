import { $ } from "../utils/dom.js";

export const resetMedicalForm = () => $("medicalForm").reset();

export function fillMedicalForm(data) {
  $("condition").value = data.condition;
  $("medication").value = data.medication;
  $("date").value = data.date;
}
