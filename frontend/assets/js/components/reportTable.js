// frontend/assets/js/components/reportTable.js
import { $ } from "../utils/dom.js";

export function renderReportTable(rows = []) {
  const body = $("reportTableBody");
  const empty = $("noRows");

  body.innerHTML = "";

  if (!rows.length) {
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2">${r.user_id ?? "-"}</td>
      <td class="px-3 py-2">${r.name}</td>
      <td class="px-3 py-2">${r.age}</td>
      <td class="px-3 py-2">${r.height}</td>
      <td class="px-3 py-2">${r.weight}</td>
      <td class="px-3 py-2">${r.gender}</td>
      <td class="px-3 py-2">${r.steps}</td>
      <td class="px-3 py-2">${r.water_intake}</td>
      <td class="px-3 py-2">${r.calories_burned}</td>
      <td class="px-3 py-2">${r.disease}</td>
      <td class="px-3 py-2">${r.genetic_disease}</td>
      <td class="px-3 py-2">${r.allergies}</td>
    `;
    body.appendChild(tr);
  });
}
