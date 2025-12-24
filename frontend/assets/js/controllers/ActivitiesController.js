import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/activitiesService.js";

import { renderActivitiesTable } from "../components/ActivitiesTable.js";
import {
  fillActivitiesForm,
  resetActivitiesForm
} from "../components/ActivitiesForm.js";

import { $ } from "../utils/dom.js";
import { getState, setState } from "../state/store.js";
import { showAlert } from "../components/Alert.js";

export function initActivitiesController() {
  const form = $("activityForm");
  const cancelBtn = $("cancelBtn");

  if (!form || !cancelBtn) return;

  loadActivities();

  form.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_id: $("user_id").value,
      steps: $("steps").value,
      water_intake: $("water_intake").value,
      calories_burned: $("calories_burned").value
    };

    const { editingId } = getState();

    if (editingId) {
      await updateActivity(editingId, data);
    } else {
      await createActivity(data);
    }
  };

  cancelBtn.onclick = () => {
    setState({ editingId: null });
    resetActivitiesForm();
  };
}

async function loadActivities() {
  const spinner = $("loadingSpinner");
  const table = $("activitiesTableContainer");

  spinner.style.display = "block";
  table.classList.add("hidden");

  const activities = await apiGetAll();
  renderActivitiesTable(activities);

  spinner.style.display = "none";
  table.classList.remove("hidden");
}

async function createActivity(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Activity added");
    resetActivitiesForm();
    loadActivities();
  }
}

export async function editActivity(id) {
  const activity = await apiGetOne(id);
  setState({ editingId: id });
  fillActivitiesForm(activity);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function updateActivity(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Activity updated");
    setState({ editingId: null });
    resetActivitiesForm();
    loadActivities();
  }
}

export async function deleteActivityAction(id) {
  if (!confirm("Delete this activity?")) return;

  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Activity deleted");
    loadActivities();
  }
}
