import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/activitiesService.js";

import { renderActivitiesTable } from "../components/ActivitiesTable.js";
import { $ } from "../utils/dom.js";

let editingId = null;

export function initActivitiesController() {
  loadActivities();

  const form = $("activityForm");
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_id: $("user_id").value,
      steps: $("steps").value,
      water_intake: $("water_intake").value,
      calories_burned: $("calories_burned").value
    };

    if (editingId) {
      await apiUpdate(editingId, data);
      editingId = null;
    } else {
      await apiCreate(data);
    }

    form.reset();
    loadActivities();
  };
}

async function loadActivities() {
  const spinner = $("loadingSpinner");
  const table = $("activitiesTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.classList.add("hidden");

  const activities = await apiGetAll();
  renderActivitiesTable(activities);

  if (spinner) spinner.style.display = "none";
  if (table) table.classList.remove("hidden");
}

export async function editActivity(id) {
  const activity = await apiGetOne(id); 
  if (!activity) {
    alert("Activity not found");
    return;
  }

  editingId = id;

  $("user_id").value = activity.user_id;
  $("steps").value = activity.steps;
  $("water_intake").value = activity.water_intake;
  $("calories_burned").value = activity.calories_burned;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

export async function deleteActivityAction(id) {
  if (!confirm("Delete this activity?")) return;
  await apiDelete(id);
  loadActivities();
}



