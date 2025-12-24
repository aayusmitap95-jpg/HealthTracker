import { $ } from "../utils/dom.js";

export function resetMedicalForm() {
  $("medicalForm").reset();
  $("submitBtn").textContent = "Add Record";
  $("cancelBtn").classList.add("hidden");
}

export function fillMedicalForm(record) {
  $("user_id").value = record.user_id;
  $("disease").value = record.disease;
  $("disease_type").value = record.disease_type;
  $("genetic").value = record.genetic;
  $("notes").value = record.notes || "";

  $("submitBtn").textContent = "Update Record";
  $("cancelBtn").classList.remove("hidden");
}
