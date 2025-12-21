import { $ } from "../utils/dom.js";

export function resetActivitiesForm() {
  $("activitiesForm").reset();
}

export function fillActivitiesForm(activities) {
  $("type").value = activities.type;
  $("duration").value = activities.duration;
  $("calories").value = activities.calories;
}
