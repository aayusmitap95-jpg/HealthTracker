// frontend/assets/js/controllers/reportController.js
import { apiGetReport } from "../services/reportService.js";
import { renderReportTable } from "../components/reportTable.js";
import { $ } from "../utils/dom.js";

let allReportData = []; // Store all data for filtering

export function initreportController() {
  console.log("Report controller initialized");
  loadReport();
  initSearchFunctionality();
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
      filterReports(searchTerm);
    }, 300);
  });
  
  // Clear button handler
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.classList.add("hidden");
      filterReports("");
      searchInput.focus();
    });
  }
}

function filterReports(searchTerm) {
  if (!searchTerm) {
    // Show all data
    renderReportTable(allReportData);
    updateResultCount(allReportData.length, allReportData.length);
    return;
  }
  
  const term = searchTerm.toLowerCase();
  
  // Filter data by user_id, name, or disease
  const filtered = allReportData.filter(row => {
    return (
      (row.user_id && row.user_id.toString().includes(term)) ||
      (row.name && row.name.toLowerCase().includes(term)) ||
      (row.disease && row.disease.toLowerCase().includes(term)) ||
      (row.genetic_disease && row.genetic_disease.toLowerCase().includes(term)) ||
      (row.allergies && row.allergies.toLowerCase().includes(term))
    );
  });
  
  renderReportTable(filtered);
  updateResultCount(filtered.length, allReportData.length);
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