import {
  apiGetAll,
  apiGetOne,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/userService.js";

import { renderUserTable } from "../components/UserTable.js";
import { resetForm, fillForm } from "../components/UserForm.js";
import { showAlert } from "../components/Alert.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export function initUserController() {
  const form = $("userForm");
  const cancelBtn = $("cancelBtn");

  if (!form || !cancelBtn) return;

  loadUsers();

  form.onsubmit = async (e) => {
    e.preventDefault();

    const data = {

      name: $("name").value.trim(),
      age: parseInt($("age").value),
      height: parseFloat($("height").value),
      weight: parseFloat($("weight").value),
      gender: $("gender").value
    };

    const { editingId } = getState();

    if (editingId) {
      await updateUser(editingId, data);
    } else {
      await createUser(data);
    }
  };

  cancelBtn.onclick = () => {
    setState({ editingId: null });
    resetForm();
  };
}

async function loadUsers() {
  const spinner = $("loadingSpinner");
  const table = $("usersTableContainer");

  try {
    spinner.style.display = "block";
    table.classList.add("hidden");

    const users = await apiGetAll();
    setState({ users });
    renderUserTable(users);
  } catch (error) {
    console.error("Failed to load users:", error);
    showAlert("Failed to load users. Make sure the server is running.", "error");
  } finally {
    spinner.style.display = "none";
    table.classList.remove("hidden");
  }
}


async function createUser(data) {
  try {
    const res = await apiCreate(data);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server response:", errorText);
      throw new Error("Create failed");
    }

    showAlert("User added");
    resetForm();
    loadUsers();
  } catch (err) {
    showAlert("Failed to add user. Check console for details.", "error");
    console.error(err);
  }
}

export async function editUser(id) {
  try {
    const user = await apiGetOne(id);
    setState({ editingId: id });
    fillForm(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    showAlert("Failed to load user for editing", "error");
    console.error(err);
  }
}

async function updateUser(id, data) {
  try {
    const res = await apiUpdate(id, data);
    if (!res.ok) {
      throw new Error("Update failed");
    }
    
    showAlert("User updated");
    setState({ editingId: null });
    resetForm();
    loadUsers();
  } catch (error) {
    showAlert("Failed to update user", "error");
    console.error(error);
  }
}

export async function deleteUserAction(id) {
  if (!confirm("Delete this user?")) return;

  try {
    const res = await apiDelete(id);
    if (!res.ok) {
      throw new Error("Delete failed");
    }
    
    showAlert("User deleted");
    loadUsers();
  } catch (error) {
    showAlert("Failed to delete user", "error");
    console.error(error);
  }
}