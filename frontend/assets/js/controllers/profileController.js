// frontend/assets/js/controllers/profileController.js
import { $ } from "../utils/dom.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";
import {
  fetchUserById,
  fetchActivitiesForUser,
  fetchMedicalForUser,
} from "../services/profileService.js";
import {
  setProfileLoading,
  renderUserBasic,
  renderActivityCount,
  renderActivitiesTable,
  renderMedicalCount,
  renderMedicalTable,
  renderProfileError,
} from "../components/ProfileView.js";
import {
  ACTIVITY_CSV_COLUMNS,
  MEDICAL_CSV_COLUMNS,
  normalizeActivityRows,
  normalizeMedicalRows,
  buildProfilePDFHtml,
} from "../utils/profileExport.js";

export function initProfileController() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  if (!userId) {
    renderProfileError("No user ID provided in URL.");
    return;
  }

  loadProfile(userId);
}

async function loadProfile(userId) {
  setProfileLoading(true);
  try {
    setProfileLoading(true);

    // Fetch all data in parallel
    const [user, activities, medical] = await Promise.all([
      fetchUserById(userId),
      fetchActivitiesForUser(userId),
      fetchMedicalForUser(userId),
    ]);

    if (!user) {
      throw new Error("User not found");
    }

  
     renderUserBasic(user);
        renderActivityCount(activities?.length || 0);
    renderActivitiesTable(activities || []);

    renderMedicalCount(medical?.length || 0);
    renderMedicalTable(medical || []);

  
    setupExportButtons(user, activities || [], medical || []);
  } catch (err) {
    renderProfileError(err.message);
  } finally {
    setProfileLoading(false);
  }
}

function setupExportButtons(user, activities, medical) {
  // Export all data as PDF
  const pdfBtn = $("profileExportPdfBtn");
  if (pdfBtn) {
    pdfBtn.onclick = () => {
      const html = buildProfilePDFHtml(user, activities, medical);
      exportToPDF(`User_${user.user_id}_Profile`, html);
    };
  }

    const activityCsvBtn = $("activityExportCsvBtn");
  if (activityCsvBtn) {
    activityCsvBtn.onclick = () => {
      exportToCSV(
        `user_${user.user_id}_activities.csv`,
        normalizeActivityRows(activities),
        ACTIVITY_CSV_COLUMNS
      );
    };
  }

  const medicalCsvBtn = $("medicalExportCsvBtn");
  if (medicalCsvBtn) {
    medicalCsvBtn.onclick = () => {
      exportToCSV(
        `user_${user.user_id}_medical.csv`,
        normalizeMedicalRows(medical),
        MEDICAL_CSV_COLUMNS
      );
    };
  }
}

export default { initProfileController };