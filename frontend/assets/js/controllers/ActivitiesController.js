import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/activitiesService.js";
import { renderActivitiesTable } from "../components/ActivitiesTable.js";
import { apiGetAll as apiGetAllUsers } from "../services/userService.js";
import { $ } from "../utils/dom.js";
import { getState, setState } from "../state/store.js";
import { showAlert } from "../components/Alert.js";

let currentUserId = null;
let existingActivityId = null;

export function initActivitiesController() {
  const form = $("activityForm");
  const cancelBtn = $("cancelBtn");
  
  if (!form || !cancelBtn) {
    console.error("Activity form elements not found!");
    return;
  }
  
  // Check user and load
  checkUserAndLoadActivity();
  
  form.onsubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUserId) {
      showAlert("Please create a user first!", "error");
      return;
    }
    
    const data = {
      user_id: currentUserId,
      steps: $("steps").value,
      water_intake: $("water_intake").value,
      calories_burned: $("calories_burned").value
    };
    
    if (existingActivityId) {
      await updateActivity(existingActivityId, data);
    } else {
      await createActivity(data);
    }
  };
  
  cancelBtn.onclick = () => {
    form.reset();
    $("cancelBtn").classList.add("hidden");
    checkUserAndLoadActivity();
  };
}

async function checkUserAndLoadActivity() {
  try {
    const userDisplay = $("currentUserDisplay");
    if (!userDisplay) return;
    
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
      loadActivities();
      return;
    }
    
    const latestUser = users.reduce((max, user) => 
      user.user_id > max.user_id ? user : max
    );
    
    currentUserId = latestUser.user_id;
    
    const allActivities = await apiGetAll();
    const existingActivity = allActivities.find(a => Number(a.user_id) === Number(currentUserId));
    
    if (existingActivity) {
      existingActivityId = existingActivity.id;
      userDisplay.innerHTML = `
        <span class="text-blue-700 font-semibold">Editing activity for:</span>
        <span class="font-bold">${latestUser.name} (ID: ${latestUser.user_id})</span>
      `;
      
      $("steps").value = existingActivity.steps || "";
      $("water_intake").value = existingActivity.water_intake || "";
      $("calories_burned").value = existingActivity.calories_burned || "";
      $("submitBtn").textContent = "Update Activity";
    } else {
      existingActivityId = null;
      userDisplay.innerHTML = `
        <span class="text-green-700 font-semibold">Adding activity for:</span>
        <span class="font-bold">${latestUser.name} (ID: ${latestUser.user_id})</span>
      `;
      $("submitBtn").textContent = "Add Activity";
    }
    
    await loadActivities();
  } catch (error) {
    console.error("Error in checkUserAndLoadActivity:", error);
    await loadActivities();
  }
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

async function createActivity(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Activity added!");
    await checkUserAndLoadActivity();
  } else {
    showAlert("Failed to add activity", "error");
  }
}

async function updateActivity(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Activity updated!");
    await checkUserAndLoadActivity();
  } else {
    showAlert("Failed to update activity", "error");
  }
}

export async function editActivity(id) {
  try {
    const activity = await apiGetOne(id);
    if (!activity) {
      showAlert("Activity not found", "error");
      return;
    }
    
    // Set this activity as the one being edited
    existingActivityId = activity.id;
    currentUserId = activity.user_id;
    
    // Update display
    const userDisplay = $("currentUserDisplay");
    if (userDisplay) {
      // Try to get user name
      const users = await apiGetAllUsers();
      const user = users.find(u => u.user_id === activity.user_id);
      const userName = user ? user.name : "Unknown";
      
      userDisplay.innerHTML = `
        <span class="text-blue-700 font-semibold">Editing activity for:</span>
        <span class="font-bold">${userName} (ID: ${activity.user_id})</span>
      `;
    }
    
    // Fill form
    $("steps").value = activity.steps || "";
    $("water_intake").value = activity.water_intake || "";
    $("calories_burned").value = activity.calories_burned || "";
    $("submitBtn").textContent = "Update Activity";
    $("cancelBtn").classList.remove("hidden");
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error editing activity:", error);
    showAlert("Error loading activity", "error");
  }
}

export async function deleteActivityAction(id) {
  if (!confirm("Delete this activity?")) return;
  
  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Activity deleted!");
    existingActivityId = null;
    await checkUserAndLoadActivity();
  } else {
    showAlert("Failed to delete activity", "error");
  }
}