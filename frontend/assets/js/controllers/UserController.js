import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/userService.js";

import { showAlert } from "../components/Alert.js";
import { renderUserTable } from "../components/UserTable.js";
import { resetForm, fillForm } from "../components/UserForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

/* Initialize User Page */
export function initUserController() {
  loadUsers();

  // Handle form submit
  $("userForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("name").value.trim(),
      age: $("age").value.trim(),
      height: $("height").value.trim(),
      weight: $("weight").value.trim(),
      gender: $("gender").value
    };

    const { editingId } = getState();

    editingId
      ? await updateUser(editingId, data)
      : await createNewUser(data);
  });

  // Cancel edit
  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

/* Load all users */
export async function loadUsers() {
  const spinner = $("loadingSpinner");
  const table = $("usersTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const users = await apiGetAll();
  setState({ users });

  renderUserTable(users);

  spinner.style.display = "none";
  table.style.display = "block";
}

/* Create user */
export async function createNewUser(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("User added successfully");
    resetForm();
    loadUsers();
  }
}

/* Edit user */
export async function editUser(id) {
  const user = await apiGetOne(id);
  setState({ editingId: id });
  fillForm(user);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Update user */
export async function updateUser(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("User updated");
    resetForm();
    setState({ editingId: null });
    loadUsers();
  }
}

/* Delete user */
export async function deleteUserAction(id) {
  if (!confirm("Delete this user?")) return;

  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("User deleted");
    loadUsers();
  }
}

