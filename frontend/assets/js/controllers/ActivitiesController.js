import {
  apiGetAll,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/activitiesService.js";

import { renderActivitiesTable } from "../components/ActivitiesTable.js";
import { $ } from "../utils/dom.js";

let editingId = null;

export function initActivitiesController() {
  loadActivities();

  $("activityForm").addEventListener("submit", async (e) => {
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

    $("activityForm").reset();
    loadActivities();
  });
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

export function editActivity(id) {
  editingId = id;
}

export async function deleteActivityAction(id) {
  await apiDelete(id);
  loadActivities();
}


