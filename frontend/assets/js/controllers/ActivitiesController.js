import {
  apiGetAll,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/activitiesService.js";

import { renderActivitiesTable } from "../components/ActivitiesTable.js";

let editingId = null;

export async function initActivitiesController() {
  const data = await apiGetAll();
  renderActivitiesTable(data);
}

export function editActivity(id) {
  editingId = id;
  // optionally load data into form
}

export async function deleteActivityAction(id) {
  await apiDelete(id);
  initActivitiesController();
}

export async function saveActivity(data) {
  if (editingId) {
    await apiUpdate(editingId, data);
    editingId = null;
  } else {
    await apiCreate(data);
  }
  initActivitiesController();
}


