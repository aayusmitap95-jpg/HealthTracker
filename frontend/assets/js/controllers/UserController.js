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
      age: $("age").value,
      height: $("height").value,
      weight: $("weight").value,
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

  if (spinner) spinner.style.display = "block";
  if (table) table.classList.add("hidden");

  const users = await apiGetAll();
  setState({ users });
  renderUserTable(users);

  if (spinner) spinner.style.display = "none";
  if (table) table.classList.remove("hidden");
}


async function createUser(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("User added");
    resetForm();
    loadUsers();
  }
}

export async function editUser(id) {
  const user = await apiGetOne(id);
  setState({ editingId: id });
  fillForm(user);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function updateUser(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("User updated");
    setState({ editingId: null });
    resetForm();
    loadUsers();
  }
}

export async function deleteUserAction(id) {
  if (!confirm("Delete this user?")) return;
  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("User deleted");
    loadUsers();
  }
}



