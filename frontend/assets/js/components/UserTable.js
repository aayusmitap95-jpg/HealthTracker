// import { $ } from "../utils/dom.js";
// import { editUser, deleteUserAction } from "../controllers/UserController.js";

// export function renderUserTable(users = []) {
//   const body = $("usersTableBody");
//   const noUsers = $("noUsers");
//     if (!body || !noUsers) return;
//   body.innerHTML = "";

//   if (!Array.isArray(users) || users.length === 0) {
//     noUsers.style.display = "block";
//     return;
//   }

//   noUsers.style.display = "none";

//   users.forEach(user => {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//       <td>${user.id}</td>
//       <td>${user.name}</td>
//       <td>${user.age}</td>
//       <td>${user.height}</td>
//       <td>${user.weight}</td>
//       <td>${user.gender}</td>
//       <td>
//         <button data-edit="${user.id}">Edit</button>
//         <button data-delete="${user.id}">Delete</button>
//       </td>
//     `;

//     row.querySelector("[data-edit]").onclick = () => editUser(user.id);
//     row.querySelector("[data-delete]").onclick = () => deleteUserAction(user.id);

//     body.appendChild(row);
//   });
// }
import { $ } from "../utils/dom.js";
import { editUser, deleteUserAction } from "../controllers/UserController.js";

export function renderUserTable(users = []) {
  const body = $("usersTableBody");
  const noUsers = $("noUsers");

  if (!body || !noUsers) return;

  body.innerHTML = "";

  if (users.length === 0) {
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
      <td class="px-3 py-2">${user.height}</td>
      <td class="px-3 py-2">${user.weight}</td>
      <td class="px-3 py-2">${user.gender}</td>
      <td class="px-3 py-2 space-x-2">
        <button class="bg-yellow-400 px-3 py-1 rounded"
          data-edit="${user.id}">Edit</button>
        <button class="bg-red-500 text-white px-3 py-1 rounded"
          data-delete="${user.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editUser(user.id);
    row.querySelector("[data-delete]").onclick = () => deleteUserAction(user.id);

    body.appendChild(row);
  });
}




