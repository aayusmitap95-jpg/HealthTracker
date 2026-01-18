import { $ } from "../utils/dom.js";

export function resetActivitiesForm() {
  $("activityForm").reset();
  $("submitBtn").textContent = "Add Activity";
  $("cancelBtn").classList.add("hidden");
}

export function fillActivitiesForm(activity) {
  $("user_id").value = activity.user_id;
  $("steps").value = activity.steps;
  $("water_intake").value = activity.water_intake;
  $("calories_burned").value = activity.calories_burned;
  $("submitBtn").textContent = "Update Activity";
  $("cancelBtn").classList.remove("hidden");
}

export function fillUserDropdown(users) {
  const select = $("user_id");
  if (!select) return;
  
  select.innerHTML = '<option value="">Select User</option>';
  
  (users || []).forEach(user => {
    const option = document.createElement("option");
    option.value = user.user_id;
    option.textContent = `${user.name} (ID: ${user.user_id})`;
    select.appendChild(option);
  });
}