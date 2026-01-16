// // frontend/assets/js/components/reportTable.js
// import { $ } from "../utils/dom.js";

// export function renderReportTable(rows = []) {
//   const body = $("reportTableBody");
//   const empty = $("noRows");

//   body.innerHTML = "";

//   if (!rows.length) {
//     empty.classList.remove("hidden");
//     return;
//   }

//   empty.classList.add("hidden");

//   rows.forEach(r => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td class="px-3 py-2">${r.user_id ?? "-"}</td>
//       <td class="px-3 py-2">${r.name}</td>
//       <td class="px-3 py-2">${r.age}</td>
//       <td class="px-3 py-2">${r.height}</td>
//       <td class="px-3 py-2">${r.weight}</td>
//       <td class="px-3 py-2">${r.gender}</td>
//       <td class="px-3 py-2">${r.steps}</td>
//       <td class="px-3 py-2">${r.water_intake}</td>
//       <td class="px-3 py-2">${r.calories_burned}</td>
//       <td class="px-3 py-2">${r.disease}</td>
//       <td class="px-3 py-2">${r.genetic_disease}</td>
//       <td class="px-3 py-2">${r.allergies}</td>
//     `;
//     body.appendChild(tr);
//   });
// }


// frontend/assets/js/components/reportTable.js
import { $ } from "../utils/dom.js";

export function renderReportTable(rows = []) {
  console.log("renderReportTable() called with", rows.length, "rows");
  
  const body = $("reportTableBody");
  const empty = $("noRows");

  if (!body) {
    console.error("ERROR: reportTableBody element not found!");
    return;
  }

  body.innerHTML = "";

  if (!rows.length) {
    console.log("No rows to display");
    if (empty) empty.classList.remove("hidden");
    return;
  }

  if (empty) empty.classList.add("hidden");

  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2"><strong>${r.user_id || 'N/A'}</strong></td>
      <td class="px-3 py-2">${r.name || 'N/A'}</td>
      <td class="px-3 py-2">${r.age || 'N/A'}</td>
      <td class="px-3 py-2">${r.height || 'N/A'}</td>
      <td class="px-3 py-2">${r.weight || 'N/A'}</td>
      <td class="px-3 py-2">${r.gender || 'N/A'}</td>
      <td class="px-3 py-2">${r.steps || 'N/A'}</td>
      <td class="px-3 py-2">${r.water_intake || 'N/A'}</td>
      <td class="px-3 py-2">${r.calories_burned || 'N/A'}</td>
      <td class="px-3 py-2">${r.disease || 'None'}</td>
      <td class="px-3 py-2">${r.genetic_disease || 'None'}</td>
      <td class="px-3 py-2">${r.allergies || 'None'}</td>
    `;
    body.appendChild(tr);
  });
  
  console.log("Table rendering complete");
}