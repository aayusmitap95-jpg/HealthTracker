// // frontend/assets/js/services/reportService.js
// const API_URL = "/api/report";
// //const API_URL = window.ENV.REPORT_API;
// async function safeJson(res) {
//   try {
//     return await res.json();
//   } catch {
//     return [];
//   }
// }

// export async function apiGetReport() {
//   const res = await fetch(API_URL);
//   if (!res.ok) return [];
//   return safeJson(res);
// }


// frontend/assets/js/services/reportService.js

// Using /api/report endpoint
const API_URL = "/api/report";

async function safeJson(res) {
  try {
    const data = await res.json();
    console.log("📊 API Response Data:", data);
    return data;
  } catch (error) {
    console.error("❌ JSON parse error:", error);
    return [];
  }
}

export async function apiGetReport() {
  console.log("🔍 Fetching from:", API_URL);
  
  try {
    const res = await fetch(API_URL);
    console.log("📡 HTTP Response:", res.status, res.statusText);
    
    if (!res.ok) {
      console.error(`❌ API error: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const data = await safeJson(res);
    console.log("✅ Total records loaded:", data.length);
    
    return data;
    
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return [];
  }
}