// import {
//   apiGetAll,
//   apiGetOne,
//   apiCreate,
//   apiUpdate,
//   apiDelete
// } from "../services/activitiesService.js";
// import { renderActivitiesTable } from "../components/ActivitiesTable.js";
// import {
//   fillActivitiesForm,
//   resetActivitiesForm
// } from "../components/ActivitiesForm.js";
// import { apiGetAll as apiGetAllUsers } from "../services/userService.js";
// import { $ } from "../utils/dom.js";
// import { getState, setState } from "../state/store.js";
// import { showAlert } from "../components/Alert.js";

// export function initActivitiesController() {
//   const form = $("activityForm");
//   const cancelBtn = $("cancelBtn");
  
//   if (!form || !cancelBtn) return;
  
//   // Load latest user and activities
//   loadLatestUserAndActivities();
  
//   form.onsubmit = async (e) => {
//     e.preventDefault();
    
//     const data = {
//       user_id: $("user_id").value,
//       steps: $("steps").value,
//       water_intake: $("water_intake").value,
//       calories_burned: $("calories_burned").value
//     };
    
//     if (!data.user_id) {
//       showAlert("Please create a user first!", "error");
//       return;
//     }
    
//     const { editingId } = getState();
//     if (editingId) {
//       await updateActivity(editingId, data);
//     } else {
//       await createActivity(data);
//     }
//   };
  
//   cancelBtn.onclick = () => {
//     setState({ editingId: null });
//     resetActivitiesForm();
//   };
// }

// async function loadLatestUserAndActivities() {
//   // Get all users and use the latest one
//   const users = await apiGetAllUsers();
  
//   if (users && users.length > 0) {
//     // Get the user with highest user_id (most recent)
//     const latestUser = users.reduce((max, user) => 
//       user.user_id > max.user_id ? user : max
//     );
    
//     // Set the hidden field
//     $("user_id").value = latestUser.user_id;
    
//     // Display who we're adding activity for
//     $("currentUserDisplay").textContent = 
//       `${latestUser.name} (ID: ${latestUser.user_id})`;
//   } else {
//     $("currentUserDisplay").textContent = "No users found - create a user first!";
//     $("currentUserDisplay").classList.add("text-red-600");
//   }
  
//   // Load activities
//   await loadActivities();
// }

// async function loadActivities() {
//   const spinner = $("loadingSpinner");
//   const table = $("activitiesTableContainer");
  
//   spinner.style.display = "block";
//   table.classList.add("hidden");
  
//   const activities = await apiGetAll();
//   renderActivitiesTable(activities);
  
//   spinner.style.display = "none";
//   table.classList.remove("hidden");
// }

// async function createActivity(data) {
//   const res = await apiCreate(data);
//   if (res.ok) {
//     showAlert("Activity added");
//     resetActivitiesForm();
//     loadActivities();
//     // Reset the user_id after form reset
//     loadLatestUserAndActivities();
//   } else {
//     showAlert("Failed to add activity", "error");
//   }
// }

// export async function editActivity(id) {
//   const activity = await apiGetOne(id);
//   setState({ editingId: id });
//   fillActivitiesForm(activity);
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }

// async function updateActivity(id, data) {
//   const res = await apiUpdate(id, data);
//   if (res.ok) {
//     showAlert("Activity updated");
//     setState({ editingId: null });
//     resetActivitiesForm();
//     loadActivities();
//   } else {
//     showAlert("Failed to update activity", "error");
//   }
// }

// export async function deleteActivityAction(id) {
//   if (!confirm("Delete this activity?")) return;
  
//   const res = await apiDelete(id);
//   if (res.ok) {
//     showAlert("Activity deleted");
//     loadActivities();
//   } else {
//     showAlert("Failed to delete activity", "error");
//   }
// }


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
  // Not needed anymore since we auto-detect
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