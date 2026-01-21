// frontend/assets/js/utils/profileExport.js
// Export helpers for the profile page

function esc(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// CSV column definitions for activities
export const ACTIVITY_CSV_COLUMNS = [
  { key: "id", label: "Activity ID" },
  { key: "steps", label: "Steps" },
  { key: "water_intake", label: "Water Intake (L)" },
  { key: "calories_burned", label: "Calories Burned" },
];

// CSV column definitions for medical records
export const MEDICAL_CSV_COLUMNS = [
  { key: "id", label: "Record ID" },
  { key: "disease", label: "Disease" },
  { key: "genetic_disease", label: "Genetic Disease" },
  { key: "allergies", label: "Allergies" },
];

// Normalize activity rows
export function normalizeActivityRows(rows) {
  return (rows || []).map((r) => ({
    id: r.id ?? "",
    steps: r.steps ?? "",
    water_intake: r.water_intake ?? "",
    calories_burned: r.calories_burned ?? "",
  }));
}

// Normalize medical rows
export function normalizeMedicalRows(rows) {
  return (rows || []).map((r) => ({
    id: r.id ?? "",
    disease: r.disease ?? "",
    genetic_disease: r.genetic_disease ?? "",
    allergies: r.allergies ?? "",
  }));
}

// Build PDF HTML for complete profile
export function buildProfilePDFHtml(user, activities, medical) {
  const safeUser = user || {};
  const safeActivities = normalizeActivityRows(activities);
  const safeMedical = normalizeMedicalRows(medical);

  return `
    <h1>User Profile Report</h1>
    <div class="meta">Generated on ${new Date().toLocaleString()}</div>
    
    <h2>Basic Details</h2>
    <table>
      <tbody>
        <tr><th>User ID</th><td>${esc(safeUser.user_id)}</td></tr>
        <tr><th>Name</th><td>${esc(safeUser.name)}</td></tr>
        <tr><th>Age</th><td>${esc(safeUser.age)}</td></tr>
        <tr><th>Height (cm)</th><td>${esc(safeUser.height)}</td></tr>
        <tr><th>Weight (kg)</th><td>${esc(safeUser.weight)}</td></tr>
        <tr><th>Gender</th><td>${esc(safeUser.gender)}</td></tr>
      </tbody>
    </table>

    <h2>Activity Records (${safeActivities.length})</h2>
    <table>
      <thead>
        <tr>
          <th>Activity ID</th>
          <th>Steps</th>
          <th>Water Intake (L)</th>
          <th>Calories Burned</th>
        </tr>
      </thead>
      <tbody>
        ${
          safeActivities.length
            ? safeActivities
                .map(
                  (r) => `
          <tr>
            <td>${esc(r.id)}</td>
            <td>${esc(r.steps)}</td>
            <td>${esc(r.water_intake)}</td>
            <td>${esc(r.calories_burned)}</td>
          </tr>
        `
                )
                .join("")
            : `<tr><td colspan="4">No activity records found.</td></tr>`
        }
      </tbody>
    </table>

    <h2>Medical Records (${safeMedical.length})</h2>
    <table>
      <thead>
        <tr>
          <th>Record ID</th>
          <th>Disease</th>
          <th>Genetic Disease</th>
          <th>Allergies</th>
        </tr>
      </thead>
      <tbody>
        ${
          safeMedical.length
            ? safeMedical
                .map(
                  (r) => `
          <tr>
            <td>${esc(r.id)}</td>
            <td>${esc(r.disease)}</td>
            <td>${esc(r.genetic_disease)}</td>
            <td>${esc(r.allergies)}</td>
          </tr>
        `
                )
                .join("")
            : `<tr><td colspan="4">No medical records found.</td></tr>`
        }
      </tbody>
    </table>
  `;
}