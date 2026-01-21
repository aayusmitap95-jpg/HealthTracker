// frontend/assets/js/components/ProfileView.js
import { $ } from "../utils/dom.js";

function show(id, yes) {
  const el = $(id);
  if (!el) return;
  el.classList[yes ? "remove" : "add"]("hidden");
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? "—";
}

// // Set loading state for all sections
// export function setProfileLoading(isLoading) {
//   // Basic Details
//   show("basicLoading", isLoading);
//   show("basicDetails", !isLoading);

//   // Activities
//   show("activityLoading", isLoading);
//   show("activityTableContainer", !isLoading);

//   // Medical Records
//   show("medicalLoading", isLoading);
//   show("medicalTableContainer", !isLoading);
// }
export function setProfileLoading(isLoading) {
  const ids = [
    ["basicLoading", "basicDetails"],
    ["activityLoading", "activityTableContainer"],
    ["medicalLoading", "medicalTableContainer"],
  ];

  ids.forEach(([loader, content]) => {
    const loaderEl = document.getElementById(loader);
    const contentEl = document.getElementById(content);

    if (loaderEl) loaderEl.classList.toggle("hidden", !isLoading);
    if (contentEl) contentEl.classList.toggle("hidden", isLoading);
  });
}


// Render user basic information
export function renderUserBasic(user) {
  setText("userId", user?.user_id ?? "—");
  setText("userName", user?.name ?? "—");
  setText("userAge", user?.age ?? "—");
  setText("userHeight", user?.height ?? "—");
  setText("userWeight", user?.weight ?? "—");
  setText("userGender", user?.gender ?? "—");
}

// Render activity count
export function renderActivityCount(count) {
  const totalEl = $("totalActivities");
  if (totalEl) totalEl.textContent = `Total: ${count ?? 0}`;
}

// Render activities table
export function renderActivitiesTable(rows) {
  const body = $("activityTableBody");
  const noActivities = $("noActivities");
  
  if (!body) return;
  
  body.innerHTML = "";

  if (!rows || rows.length === 0) {
    show("noActivities", true);
    return;
  }

  show("noActivities", false);

  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";
    tr.innerHTML = `
      <td class="px-3 py-2">${r.id ?? "—"}</td>
      <td class="px-3 py-2">${r.steps ?? "—"}</td>
      <td class="px-3 py-2">${r.water_intake ?? "—"}</td>
      <td class="px-3 py-2">${r.calories_burned ?? "—"}</td>
    `;
    body.appendChild(tr);
  });
}

// Render medical count
export function renderMedicalCount(count) {
  const totalEl = $("totalMedical");
  if (totalEl) totalEl.textContent = `Total: ${count ?? 0}`;
}

// Render medical records table
export function renderMedicalTable(rows) {
  const body = $("medicalTableBody");
  const noMedical = $("noMedical");
  
  if (!body) return;
  
  body.innerHTML = "";

  if (!rows || rows.length === 0) {
    show("noMedical", true);
    return;
  }

  show("noMedical", false);

  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";
    tr.innerHTML = `
      <td class="px-3 py-2">${r.id ?? "—"}</td>
      <td class="px-3 py-2">${r.disease ?? "—"}</td>
      <td class="px-3 py-2">${r.genetic_disease ?? "—"}</td>
      <td class="px-3 py-2">${r.allergies ?? "—"}</td>
    `;
    body.appendChild(tr);
  });
}

// Show error message
export function renderProfileError(message = "Unable to load user profile.") {
  setProfileLoading(false);
  const errorEl = $("errorMessage");
  const errorText = $("errorText");
  
  if (errorEl) errorEl.classList.remove("hidden");
  if (errorText) errorText.textContent = message;
  
  renderActivityCount(0);
  renderMedicalCount(0);
}