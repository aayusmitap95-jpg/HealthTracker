import * as api from "../services/medicalService.js";
import { showAlert } from "../components/Alert.js";
import { renderMedicalTable } from "../components/MedicalTable.js";
import { resetMedicalForm, fillMedicalForm } from "../components/MedicalForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export function initMedicalController() {
  loadMedical();

  $("medicalForm").onsubmit = async e => {
    e.preventDefault();

    const data = {
      condition: $("condition").value,
      medication: $("medication").value,
      date: $("date").value
    };

    const { editingId } = getState();
    editingId
      ? await api.apiUpdate(editingId, data)
      : await api.apiCreate(data);

    showAlert("Saved");
    resetMedicalForm();
    setState({ editingId: null });
    loadMedical();
  };
}

async function loadMedical() {
    const spinner = $("loadingSpinner");
  const table = $("medicalTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.classList.add("hidden");

  const data = await api.apiGetAll();
  renderMedicalTable(data);

  if (spinner) spinner.style.display = "none";
  if (table) table.classList.remove("hidden");
  
}

export async function editMedical(id) {
  const record = await api.apiGetOne(id);
  fillMedicalForm(record);
  setState({ editingId: id });
}

export async function deleteMedicalAction(id) {
  if (!confirm("Delete record?")) return;
  await api.apiDelete(id);
  showAlert("Deleted");
  loadMedical();
}
