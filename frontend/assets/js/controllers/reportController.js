// frontend/assets/js/controllers/reportController.js
import { apiGetReport } from "../services/reportService.js";
import { renderReportTable } from "../components/reportTable.js";
import { $ } from "../utils/dom.js";

export function initreportController() {
  loadReport();
}

async function loadReport() {
  const spinner = $("loadingSpinner");
  const table = $("reportTableContainer");

  spinner.style.display = "block";
  table.classList.add("hidden");

  const rows = await apiGetReport();
  renderReportTable(rows);

  spinner.style.display = "none";
  table.classList.remove("hidden");
}
