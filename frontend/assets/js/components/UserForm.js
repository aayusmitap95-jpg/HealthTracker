// import { $ } from "../utils/dom.js";

// /**
//  * Reset the user form to default (Add mode)
//  */
// export function resetForm() {
//   $("userForm").reset();

//   $("submitBtn").textContent = "Add User";
//   $("cancelBtn").style.display = "none";
// }

// /**
//  * Fill the form for editing a user
//  * @param {Object} user
//  */
// export function fillForm(user) {
//   $("name").value = user.name;
//   $("age").value = user.age;
//   $("height").value = user.height;
//   $("weight").value = user.weight;
//   $("gender").value = user.gender;

//   $("submitBtn").textContent = "Update User";
//   $("cancelBtn").style.display = "inline-block";
// }
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


