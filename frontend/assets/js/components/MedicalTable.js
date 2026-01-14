// frontend/assets/js/components/MedicalTable.js
import { editMedical, deleteMedicalAction } from "../controllers/MedicalController.js";
import { $ } from "../utils/dom.js";

export function renderMedicalTable(records = []) {
  const body = $("medicalTableBody");
  const noData = $("noMedical");

  body.innerHTML = "";

  if (!records.length) {
    noData.classList.remove("hidden");
    return;
  }

  noData.classList.add("hidden");

  records.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-3 py-2">${r.user_id}</td>
      <td class="px-3 py-2">${r.disease}</td>
      <td class="px-3 py-2">${r.genetic_disease}</td>
      <td class="px-3 py-2">${r.allergies}</td>
      <td class="px-3 py-2 space-x-2">
        <button class="bg-yellow-400 px-3 py-1 rounded"
          data-edit="${r.id}">Edit</button>
        <button class="bg-red-500 text-white px-3 py-1 rounded"
          data-delete="${r.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editMedical(r.id);
    row.querySelector("[data-delete]").onclick = () => deleteMedicalAction(r.id);

    body.appendChild(row);
  });
}
