import { $ } from "../utils/dom.js";
import {
  editMedical,
  deleteMedicalAction
} from "../controllers/MedicalController.js";

export function renderMedicalTable(medical) {
  const body = $("medicalTableBody");
  const noMedical = $("noMedical");
  
  if (!body || !noMedical) return;
  
  body.innerHTML = "";
  
  if (!medical || medical.length === 0) {
    noMedical.classList.remove("hidden");
    return;
  }
  
  noMedical.classList.add("hidden");
  
  medical.forEach(record => {
    const row = document.createElement("tr");
    row.className = "border-b";
    row.innerHTML = `
      <td class="px-3 py-2"><strong>${record.user_id || '-'}</strong></td>
      <td class="px-3 py-2">${record.disease || 'None'}</td>
      <td class="px-3 py-2">${record.genetic_disease || 'None'}</td>
      <td class="px-3 py-2">${record.allergies || 'None'}</td>
      <td class="px-3 py-2 space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded" data-edit>
          Edit
        </button>
        <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" data-delete>
          Delete
        </button>
      </td>
    `;
    
    row.querySelector("[data-edit]").onclick = () => editMedical(record.id);
    row.querySelector("[data-delete]").onclick = () => deleteMedicalAction(record.id);
    
    body.appendChild(row);
  });
}