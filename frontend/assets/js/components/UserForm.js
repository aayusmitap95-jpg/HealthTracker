import { $ } from "../utils/dom.js";

export function resetForm() {
  $("userForm").reset();
  $("submitBtn").textContent = "Add User";
  $("cancelBtn").style.display = "none";
}

export function fillForm(user) {
  $("name").value = user.name;
  $("age").value = user.age;
  $("height").value = user.height;
  $("weight").value = user.weight;
  $("gender").value = user.gender;

  $("submitBtn").textContent = "Update User";
  $("cancelBtn").style.display = "inline-block";
}