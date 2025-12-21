import { $ } from "../utils/dom.js";
import { editMedical, deleteMedicalAction } from "../controllers/MedicalController.js";

export function renderMedicalTable(records) {
  const body = $("medicalTableBody");
  body.innerHTML = "";

  records.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.id}</td>
      <td>${r.condition}</td>
      <td>${r.medication}</td>
      <td>${r.date}</td>
      <td>
        <button data-edit="${r.id}">Edit</button>
        <button data-delete="${r.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editMedical(r.id);
    row.querySelector("[data-delete]").onclick = () => deleteMedicalAction(r.id);

    body.appendChild(row);
  });
}
