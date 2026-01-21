// frontend/assets/js/router/viewRouter.js
import { initUserController } from "../controllers/UserController.js";
import { initActivitiesController } from "../controllers/ActivitiesController.js";
import { initMedicalController } from "../controllers/MedicalController.js";
import { initreportController } from "../controllers/reportController.js";
import { initProfileController } from "../controllers/profileController.js";



// Load HTML into #app
async function loadView(path) {
  const res = await fetch(path);
  const html = await res.text();
  document.querySelector("#app").innerHTML = html;
}

// Main router
export async function router() {
  const path = window.location.pathname;

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
  }

  else if (path === "/users") {
    await loadView("/frontend/pages/users.html");
    initUserController();
  }

  else if (path === "/activities") {
    await loadView("/frontend/pages/activities.html");
    initActivitiesController();
  }

  else if (path === "/medical") {
    await loadView("/frontend/pages/medical.html");
    initMedicalController();
  }
  else if (path === "/report") {
    await loadView("/frontend/pages/report.html");
    initreportController();
  }
   else if (path === "/profile") {
    await loadView("/frontend/pages/profile.html");
    initProfileController();
  }

  else {
    await loadView("/frontend/pages/404.html");
  }
}

// SPA navigation
export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    router();
  });

  window.addEventListener("popstate", router);
}






