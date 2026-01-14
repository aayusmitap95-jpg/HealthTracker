// frontend/assets/js/components/MedicalForm.js
import { $ } from "../utils/dom.js";

export function resetMedicalForm() {
  $("medicalForm").reset();
  $("submitBtn").textContent = "Add Record";
  $("cancelBtn").classList.add("hidden");
}

export function fillMedicalForm(record) {
  $("user_id").value = record.user_id;
  $("disease").value = record.disease;
  $("genetic_disease").value = record.genetic_disease;
  $("allergies").value = record.allergies;

  $("submitBtn").textContent = "Update Record";
  $("cancelBtn").classList.remove("hidden");
}
