// frontend/assets/js/controllers/reportController.js
import { apiGetReport } from "../services/reportService.js";
import { renderReportTable } from "../components/reportTable.js";
import { $ } from "../utils/dom.js";
import { filterList, sortList } from "../utils/listTools.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

let allReportData = []; // Store all data for filtering

const COLUMNS = [
  { key: "user_id", label: "User ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "height", label: "Height" },
  { key: "weight", label: "Weight" },
  { key: "gender", label: "Gender" },
  { key: "steps", label: "Steps" },
  { key: "water_intake", label: "Water" },
  { key: "calories_burned", label: "Calories" },
  { key: "disease", label: "Disease" },
  { key: "genetic_disease", label: "Genetic" },
  { key: "allergies", label: "Allergies" }
];

export function initreportController() {
   if (!document.getElementById("reportTableBody")) {
    console.log("ℹ️ Not report page → skipping reportController");
    return;
  }
  console.log("Report controller initialized");
  loadReport();
  initSearchFunctionality();
  // initSearchAndSort();
  initExportButtons();
}

async function loadReport() {
  const spinner = $("loadingSpinner");
  const table = $("reportTableContainer");

  // Show spinner, hide table
  if (spinner) spinner.style.display = "block";
  if (table) table.classList.add("hidden");

  try {
    // Fetch data from /api/report
    const rows = await apiGetReport();
    
    console.log("Report data received:", rows);
    
    // Store data globally for filtering
    allReportData = rows;
    
    // Render the table
    renderReportTable(rows);
    updateResultCount(rows.length, rows.length);
    
  } catch (error) {
    console.error("Error loading report:", error);
    
    // Show error message
    const tbody = $("reportTableBody");
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="12" style="text-align: center; color: red; padding: 2rem;">
            ❌ Error loading report: ${error.message}
          </td>
        </tr>
      `;
    }
  } finally {
    // Hide spinner, show table
    if (spinner) spinner.style.display = "none";
    if (table) table.classList.remove("hidden");
  }
}

function initSearchFunctionality() {
  const searchInput = $("searchInput");
  const clearBtn = $("clearSearch");
  const sortBy = $("sortBy");
  const sortDir = $("sortDir");
  
  if (!searchInput) return;
  
  // Search input handler with debounce
  let searchTimeout;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    
    const searchTerm = e.target.value.trim();
    
    // Show/hide clear button
    if (clearBtn) {
      if (searchTerm) {
        clearBtn.classList.remove("hidden");
      } else {
        clearBtn.classList.add("hidden");
      }
    }
    
    // Debounce search (wait 300ms after user stops typing)
    searchTimeout = setTimeout(() => {
      // filterReports(searchTerm);
      applyFiltersAndSort();
    }, 300);
  });
  
  // Clear button handler
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.classList.add("hidden");
      applyFiltersAndSort();
      // filterReports("");
      searchInput.focus();
    });
  }
  if (sortBy) {
    sortBy.addEventListener("change", applyFiltersAndSort);
  }
  if (sortDir) {
    sortDir.addEventListener("change", applyFiltersAndSort);
  }
}
function initExportButtons() {
  const csvBtn = $("exportCsvBtn");
  const pdfBtn = $("exportPdfBtn");
  
  if (csvBtn) {
    csvBtn.addEventListener("click", () => {
      const currentData = getCurrentFilteredData();
      exportToCSV("health_report.csv", currentData, COLUMNS);
    });
  }
  
  if (pdfBtn) {
    pdfBtn.addEventListener("click", () => {
      const currentData = getCurrentFilteredData();
      const html = buildPrintableTableHTML("Health Report", currentData, COLUMNS);
      exportToPDF("Health Report", html);
    });
  }
}


function applyFiltersAndSort() {
  const currentData = getCurrentFilteredData();
  renderReportTable(currentData);
  updateResultCount(currentData.length, allReportData.length);
}

function getCurrentFilteredData() {
  const searchInput = $("searchInput");
  const sortBy = $("sortBy");
  const sortDir = $("sortDir");
  
  const searchTerm = searchInput ? searchInput.value.trim() : "";
  const sortKey = sortBy ? sortBy.value : "user_id";
  const sortDirection = sortDir ? sortDir.value : "asc";
  
  // Filter
  const searchFields = ["user_id", "name", "disease", "genetic_disease", "allergies"];
  const filtered = filterList(allReportData, searchTerm, searchFields);
  
  // Sort
  const sorted = sortList(filtered, sortKey, sortDirection);
  
  return sorted;
}

function updateResultCount(showing, total) {
  const resultCount = $("resultCount");
  if (resultCount) {
    if (showing === total) {
      resultCount.textContent = `Showing all ${total} records`;
      resultCount.style.color = "#7f8c8d";
    } else {
      resultCount.textContent = `Showing ${showing} of ${total} records`;
      resultCount.style.color = "#3498db";
      resultCount.style.fontWeight = "600";
    }
  }
}

function buildPrintableTableHTML(title, rows, columns) {
  const esc = (v) =>
    String(v ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  
  return `
    <h1>${esc(title)}</h1>
    <div class="meta">Generated on: ${new Date().toLocaleString()}</div>
    <table>
      <thead>
        <tr>
          ${columns.map((c) => `<th>${esc(c.label)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${(rows || [])
          .map(
            (r) => `
          <tr>
            ${columns.map((c) => `<td>${esc(r?.[c.key])}</td>`).join("")}
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
        }