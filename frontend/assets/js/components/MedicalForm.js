import { $ } from "../utils/dom.js";

export function resetMedicalForm() {
  $("medicalForm").reset();
  $("submitBtn").textContent = "Add Record";
  $("cancelBtn").classList.add("hidden");
  
  // Hide all input fields
  $("disease").classList.add("hidden");
  $("genetic_disease").classList.add("hidden");
  $("allergies").classList.add("hidden");
  
  // Reset radio buttons to "No"
  document.querySelector('input[name="has_disease"][value="no"]').checked = true;
  document.querySelector('input[name="has_genetic"][value="no"]').checked = true;
  document.querySelector('input[name="has_allergies"][value="no"]').checked = true;
}

export function fillMedicalForm(record) {
  $("user_id").value = record.user_id;
  
  // Disease
  if (record.disease && record.disease !== "None") {
    document.querySelector('input[name="has_disease"][value="yes"]').checked = true;
    $("disease").classList.remove("hidden");
    $("disease").value = record.disease;
  } else {
    document.querySelector('input[name="has_disease"][value="no"]').checked = true;
    $("disease").classList.add("hidden");
  }
  
  // Genetic Disease
  if (record.genetic_disease && record.genetic_disease !== "None") {
    document.querySelector('input[name="has_genetic"][value="yes"]').checked = true;
    $("genetic_disease").classList.remove("hidden");
    $("genetic_disease").value = record.genetic_disease;
  } else {
    document.querySelector('input[name="has_genetic"][value="no"]').checked = true;
    $("genetic_disease").classList.add("hidden");
  }
  
  // Allergies
  if (record.allergies && record.allergies !== "None") {
    document.querySelector('input[name="has_allergies"][value="yes"]').checked = true;
    $("allergies").classList.remove("hidden");
    $("allergies").value = record.allergies;
  } else {
    document.querySelector('input[name="has_allergies"][value="no"]').checked = true;
    $("allergies").classList.add("hidden");
  }
  
  $("submitBtn").textContent = "Update Record";
  $("cancelBtn").classList.remove("hidden");
}

export function fillUserDropdown(users) {
  const select = $("user_id");
  if (!select) return;
  
  select.innerHTML = '<option value="">Select User</option>';
  
  (users || []).forEach(user => {
    const option = document.createElement("option");
    option.value = user.user_id;
    option.textContent = `${user.name} (ID: ${user.user_id})`;
    select.appendChild(option);
  });
}

// Initialize Yes/No toggle logic
export function initMedicalFormToggle() {
  // Disease toggle
  document.querySelectorAll('.disease-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const diseaseInput = $("disease");
      if (e.target.value === 'yes') {
        diseaseInput.classList.remove("hidden");
        diseaseInput.required = true;
      } else {
        diseaseInput.classList.add("hidden");
        diseaseInput.required = false;
        diseaseInput.value = "";
      }
    });
  });
  
  // Genetic Disease toggle
  document.querySelectorAll('.genetic-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const geneticInput = $("genetic_disease");
      if (e.target.value === 'yes') {
        geneticInput.classList.remove("hidden");
        geneticInput.required = true;
      } else {
        geneticInput.classList.add("hidden");
        geneticInput.required = false;
        geneticInput.value = "";
      }
    });
  });
  
  // Allergies toggle
  document.querySelectorAll('.allergies-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const allergiesInput = $("allergies");
      if (e.target.value === 'yes') {
        allergiesInput.classList.remove("hidden");
        allergiesInput.required = true;
      } else {
        allergiesInput.classList.add("hidden");
        allergiesInput.required = false;
        allergiesInput.value = "";
      }
    });
  });
}