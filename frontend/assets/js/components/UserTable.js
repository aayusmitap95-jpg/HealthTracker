// frontend/assets/js/components/UserTable.js

import { $ } from "../utils/dom.js";
import { editUser, deleteUserAction } from "../controllers/UserController.js";

// Render users in table
export function renderUserTable(users) {
  const body = $("usersTableBody");
  const noUsers = $("noUsers");

  body.innerHTML = "";

  if (!Array.isArray(users) || users.length === 0) {
    noUsers.style.display = "block";
    return;
  }

  noUsers.style.display = "none";

  users.forEach(user => {
    const row = document.createElement("tr");
    row.className = "border-b";

    row.innerHTML = `
      <td class="px-3 py-2">${user.id}</td>
      <td class="px-3 py-2">${user.name}</td>
      <td class="px-3 py-2">${user.age}</td>
      <td class="px-3 py-2">${user.gender}</td>
      <td class="px-3 py-2">${user.email}</td>

      <td class="px-3 py-2 flex space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${user.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${user.id}">Delete</button>
      </td>
    `;

    // Edit button
    row.querySelector("[data-edit]").onclick = () => editUser(user.id);

    // Delete button
    row.querySelector("[data-delete]").onclick = () => deleteUserAction(user.id);

    body.appendChild(row);
  });
}
