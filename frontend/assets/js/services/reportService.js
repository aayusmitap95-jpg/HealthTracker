// frontend/assets/js/services/reportService.js
const API_URL = "/api/report";
//const API_URL = window.ENV.REPORT_API;
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return [];
  }
}

export async function apiGetReport() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}
