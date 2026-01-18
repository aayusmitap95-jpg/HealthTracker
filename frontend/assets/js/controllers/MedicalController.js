import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/medicalService.js";
import { renderMedicalTable } from "../components/MedicalTable.js";
import {
  fillMedicalForm,
  resetMedicalForm,
  fillUserDropdown,
  initMedicalFormToggle
} from "../components/MedicalForm.js";
import { apiGetAll as apiGetAllUsers } from "../services/userService.js";
import { $ } from "../utils/dom.js";
import { getState, setState } from "../state/store.js";
import { showAlert } from "../components/Alert.js";

export function initMedicalController() {
  const form = $("medicalForm");
  const cancelBtn = $("cancelBtn");
  
  if (!form || !cancelBtn) return;
  
  // Initialize Yes/No toggle logic
  initMedicalFormToggle();
  
  // Load users for dropdown and medical records
  loadUsersAndMedical();
  
  form.onsubmit = async (e) => {
    e.preventDefault();
    
    // Get values from form
    const hasDisease = document.querySelector('input[name="has_disease"]:checked').value;
    const hasGenetic = document.querySelector('input[name="has_genetic"]:checked').value;
    const hasAllergies = document.querySelector('input[name="has_allergies"]:checked').value;
    
    const data = {
      user_id: $("user_id").value,
      disease: hasDisease === 'yes' ? $("disease").value.trim() : "None",
      genetic_disease: hasGenetic === 'yes' ? $("genetic_disease").value.trim() : "None",
      allergies: hasAllergies === 'yes' ? $("allergies").value.trim() : "None"
    };
    
    const { editingId } = getState();
    if (editingId) {
      await updateMedical(editingId, data);
    } else {
      await createMedical(data);
    }
  };
  
  cancelBtn.onclick = () => {
    setState({ editingId: null });
    resetMedicalForm();
  };
}

async function loadUsersAndMedical() {
  // Load users for dropdown
  const users = await apiGetAllUsers();
  fillUserDropdown(users);
  
  // Load medical records
  await loadMedical();
}

async function loadMedical() {
  const spinner = $("loadingSpinner");
  const table = $("medicalTableContainer");
  
  spinner.style.display = "block";
  table.classList.add("hidden");
  
  const medical = await apiGetAll();
  renderMedicalTable(medical);
  
  spinner.style.display = "none";
  table.classList.remove("hidden");
}

async function createMedical(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Medical record added");
    resetMedicalForm();
    loadMedical();
  } else {
    showAlert("Failed to add medical record", "error");
  }
}

export async function editMedical(id) {
  const record = await apiGetOne(id);
  setState({ editingId: id });
  fillMedicalForm(record);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function updateMedical(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Medical record updated");
    setState({ editingId: null });
    resetMedicalForm();
    loadMedical();
  } else {
    showAlert("Failed to update medical record", "error");
  }
}

export async function deleteMedicalAction(id) {
  if (!confirm("Delete this medical record?")) return;
  
  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Medical record deleted");
    loadMedical();
  } else {
    showAlert("Failed to delete medical record", "error");
  }
}