// Main entrypoint for frontend
import { initUserController } from "./controllers/UserController.js";
import { router } from "./router/viewRouter.js";

// Initialize app on page load
import { router, initRouterEvents } from "./router/viewRouter.js";

window.addEventListener("DOMContentLoaded", () => {
  initRouterEvents();
  router();
});



