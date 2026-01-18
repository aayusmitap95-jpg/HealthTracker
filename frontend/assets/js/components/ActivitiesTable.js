import { $ } from "../utils/dom.js";
import {
  editActivity,
  deleteActivityAction
} from "../controllers/ActivitiesController.js";

export function renderActivitiesTable(activities) {
  const body = $("activitiesTableBody");
  const noActivities = $("noActivities");
  
  if (!body || !noActivities) return;
  
  body.innerHTML = "";
  
  if (!activities || activities.length === 0) {
    noActivities.classList.remove("hidden");
    return;
  }
  
  noActivities.classList.add("hidden");
  
  activities.forEach(activity => {
    const row = document.createElement("tr");
    row.className = "border-b";
    row.innerHTML = `
      <td class="px-3 py-2"><strong>${activity.user_id || '-'}</strong></td>
      <td class="px-3 py-2">${activity.steps || 0}</td>
      <td class="px-3 py-2">${activity.water_intake || 0}</td>
      <td class="px-3 py-2">${activity.calories_burned || 0}</td>
      <td class="px-3 py-2 space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded" data-edit>
          Edit
        </button>
        <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" data-delete>
          Delete
        </button>
      </td>
    `;
    
    row.querySelector("[data-edit]").onclick = () => editActivity(activity.id);
    row.querySelector("[data-delete]").onclick = () => deleteActivityAction(activity.id);
    
    body.appendChild(row);
  });
}