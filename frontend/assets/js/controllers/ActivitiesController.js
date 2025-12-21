import {
  apiGetAll,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/activitiesService.js";

import { renderActivitiesTable } from "../components/ActivitiesTable.js";
import { showAlert } from "../components/Alert.js";

let editingId = null;

export async function initActivitiesController() {
  loadActivities();

  const form = document.getElementById("activityForm");
  const cancelBtn = document.getElementById("cancelBtn");

  form.addEventListener("submit", submitActivity);
  cancelBtn.addEventListener("click", resetForm);
}

async function loadActivities() {
  const data = await apiGetAll();
  renderActivitiesTable(data);
}

async function submitActivity(e) {
  e.preventDefault();

  const data = {
    user_id: +document.getElementById("user_id").value,
    steps: +document.getElementById("steps").value,
    water_intake: +document.getElementById("water_intake").value,
    calories_burned: +document.getElementById("calories_burned").value
  };

  if (editingId) {
    await apiUpdate(editingId, data);
    showAlert("Activity updated");
  } else {
    await apiCreate(data);
    showAlert("Activity added");
  }

  resetForm();
  loadActivities();
}

export function editActivity(id) {
  editingId = id;
}

export async function deleteActivityAction(id) {
  await apiDelete(id);
  showAlert("Activity deleted");
  loadActivities();
}

function resetForm() {
  editingId = null;
  document.getElementById("activityForm").reset();
  document.getElementById("cancelBtn").classList.add("hidden");
}


