import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/medicalService.js";
import { renderMedicalTable } from "../components/MedicalTable.js";
import {
  initMedicalFormToggle
} from "../components/MedicalForm.js";
import { apiGetAll as apiGetAllUsers } from "../services/userService.js";
import { $ } from "../utils/dom.js";
import { getState, setState } from "../state/store.js";
import { showAlert } from "../components/Alert.js";

let currentUserId = null;
let existingMedicalId = null;

export function initMedicalController() {
  const form = $("medicalForm");
  const cancelBtn = $("cancelBtn");
  
  if (!form || !cancelBtn) {
    console.error("Medical form elements not found!");
    return;
  }
  
  // Initialize Yes/No toggle logic
  initMedicalFormToggle();
  
  // Check user and load
  checkUserAndLoadMedical();
  
  form.onsubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUserId) {
      showAlert("Please create a user first!", "error");
      return;
    }
    
    const hasDisease = document.querySelector('input[name="has_disease"]:checked')?.value || 'no';
    const hasGenetic = document.querySelector('input[name="has_genetic"]:checked')?.value || 'no';
    const hasAllergies = document.querySelector('input[name="has_allergies"]:checked')?.value || 'no';
    
    const data = {
      user_id: currentUserId,
      disease: hasDisease === 'yes' ? ($("disease").value.trim() || "None") : "None",
      genetic_disease: hasGenetic === 'yes' ? ($("genetic_disease").value.trim() || "None") : "None",
      allergies: hasAllergies === 'yes' ? ($("allergies").value.trim() || "None") : "None"
    };
    
    if (existingMedicalId) {
      await updateMedical(existingMedicalId, data);
    } else {
      await createMedical(data);
    }
  };
  
  cancelBtn.onclick = () => {
    resetForm();
  };
}

async function checkUserAndLoadMedical() {
  try {
    const userDisplay = $("currentUserDisplay");
    if (!userDisplay) {
      console.warn("currentUserDisplay element not found");
      await loadMedical();
      return;
    }
    
    const users = await apiGetAllUsers();
    
    if (!users || users.length === 0) {
      userDisplay.innerHTML = `
        <span class="text-red-600 font-semibold">⚠️ No users found!</span>
        <br>
        <span class="text-sm">Please create a user first on the 
          <a href="/users" data-link class="text-blue-600 underline">Users page</a>.
        </span>
      `;
      currentUserId = null;
      await loadMedical();
      return;
    }
    
    const latestUser = users.reduce((max, user) => 
      user.user_id > max.user_id ? user : max
    );
    
    currentUserId = latestUser.user_id;
    
    const allMedical = await apiGetAll();
    const existingMedical = allMedical.find(m => Number(m.user_id) === Number(currentUserId));
    
    if (existingMedical) {
      existingMedicalId = existingMedical.id;
      userDisplay.innerHTML = `
        <span class="text-blue-700 font-semibold">Editing medical record for:</span>
        <span class="font-bold">${latestUser.name} (ID: ${latestUser.user_id})</span>
      `;
      
      fillFormWithData(existingMedical);
      $("submitBtn").textContent = "Update Record";
    } else {
      existingMedicalId = null;
      userDisplay.innerHTML = `
        <span class="text-green-700 font-semibold">Adding medical record for:</span>
        <span class="font-bold">${latestUser.name} (ID: ${latestUser.user_id})</span>
      `;
      $("submitBtn").textContent = "Add Record";
    }
    
    await loadMedical();
  } catch (error) {
    console.error("Error in checkUserAndLoadMedical:", error);
    await loadMedical();
  }
}

function fillFormWithData(record) {
  try {
    // Disease
    if (record.disease && record.disease !== "None") {
      const diseaseYes = document.querySelector('input[name="has_disease"][value="yes"]');
      if (diseaseYes) {
        diseaseYes.checked = true;
        const diseaseInput = $("disease");
        if (diseaseInput) {
          diseaseInput.classList.remove("hidden");
          diseaseInput.value = record.disease;
        }
      }
    }
    
    // Genetic Disease
    if (record.genetic_disease && record.genetic_disease !== "None") {
      const geneticYes = document.querySelector('input[name="has_genetic"][value="yes"]');
      if (geneticYes) {
        geneticYes.checked = true;
        const geneticInput = $("genetic_disease");
        if (geneticInput) {
          geneticInput.classList.remove("hidden");
          geneticInput.value = record.genetic_disease;
        }
      }
    }
    
    // Allergies
    if (record.allergies && record.allergies !== "None") {
      const allergiesYes = document.querySelector('input[name="has_allergies"][value="yes"]');
      if (allergiesYes) {
        allergiesYes.checked = true;
        const allergiesInput = $("allergies");
        if (allergiesInput) {
          allergiesInput.classList.remove("hidden");
          allergiesInput.value = record.allergies;
        }
      }
    }
  } catch (error) {
    console.error("Error filling form:", error);
  }
}

async function loadMedical() {
  const spinner = $("loadingSpinner");
  const table = $("medicalTableContainer");
  
  if (spinner) spinner.style.display = "block";
  if (table) table.classList.add("hidden");
  
  try {
    const medical = await apiGetAll();
    renderMedicalTable(medical);
  } catch (error) {
    console.error("Error loading medical records:", error);
  }
  
  if (spinner) spinner.style.display = "none";
  if (table) table.classList.remove("hidden");
}

async function createMedical(data) {
  try {
    const res = await apiCreate(data);
    if (res.ok) {
      showAlert("Medical record added!");
      await checkUserAndLoadMedical();
    } else {
      showAlert("Failed to add medical record", "error");
    }
  } catch (error) {
    console.error("Error creating medical record:", error);
    showAlert("Error adding medical record", "error");
  }
}

async function updateMedical(id, data) {
  try {
    const res = await apiUpdate(id, data);
    if (res.ok) {
      showAlert("Medical record updated!");
      await checkUserAndLoadMedical();
    } else {
      showAlert("Failed to update medical record", "error");
    }
  } catch (error) {
    console.error("Error updating medical record:", error);
    showAlert("Error updating medical record", "error");
  }
}

export async function editMedical(id) {
  // Auto-detection handles this
}

export async function deleteMedicalAction(id) {
  if (!confirm("Delete this medical record?")) return;
  
  try {
    const res = await apiDelete(id);
    if (res.ok) {
      showAlert("Medical record deleted!");
      existingMedicalId = null;
      await checkUserAndLoadMedical();
    } else {
      showAlert("Failed to delete medical record", "error");
    }
  } catch (error) {
    console.error("Error deleting medical record:", error);
    showAlert("Error deleting medical record", "error");
  }
}

function resetForm() {
  try {
    const diseaseNo = document.querySelector('input[name="has_disease"][value="no"]');
    const geneticNo = document.querySelector('input[name="has_genetic"][value="no"]');
    const allergiesNo = document.querySelector('input[name="has_allergies"][value="no"]');
    
    if (diseaseNo) diseaseNo.checked = true;
    if (geneticNo) geneticNo.checked = true;
    if (allergiesNo) allergiesNo.checked = true;
    
    const diseaseInput = $("disease");
    const geneticInput = $("genetic_disease");
    const allergiesInput = $("allergies");
    
    if (diseaseInput) {
      diseaseInput.value = "";
      diseaseInput.classList.add("hidden");
    }
    if (geneticInput) {
      geneticInput.value = "";
      geneticInput.classList.add("hidden");
    }
    if (allergiesInput) {
      allergiesInput.value = "";
      allergiesInput.classList.add("hidden");
    }
  } catch (error) {
    console.error("Error resetting form:", error);
  }
}