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
  resetMedicalForm
} from "../components/MedicalForm.js";

import { $ } from "../utils/dom.js";
import { getState, setState } from "../state/store.js";
import { showAlert } from "../components/Alert.js";

export function initMedicalController() {
  const form = $("medicalForm");
  const cancelBtn = $("cancelBtn");

  if (!form || !cancelBtn) return;

  loadMedical();

  form.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_id: $("user_id").value,
      disease: $("disease").value,
      genetic_disease: $("genetic_disease").value,
      allergies: $("allergies").value
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
  }
}

export async function deleteMedicalAction(id) {
  if (!confirm("Delete this medical record?")) return;

  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Medical record deleted");
    loadMedical();
  }
}
