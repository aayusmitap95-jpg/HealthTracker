// Main entrypoint for frontend

import { initUserController } from "./controllers/UserController.js";
import { initActivitiesController } from "./controllers/ActivitiesController.js";
import { initMedicalController } from "./controllers/MedicalController.js";
import { initreportController } from "./controllers/reportController.js";
import { router, initRouterEvents } from "./router/viewRouter.js";

// import { router } from "./router/viewRouter.js";

// Initialize app on page load
import { router, initRouterEvents } from "./router/viewRouter.js";

window.addEventListener("DOMContentLoaded", () => {
  initRouterEvents();
  router();
});



