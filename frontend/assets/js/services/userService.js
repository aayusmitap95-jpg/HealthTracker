const API_URL = window.ENV.USERS_API;

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return [];
  }
}

export async function apiGetAll() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  const data = await safeJson(res);
  return Array.isArray(data) ? data : [];
}

export async function apiGetOne(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

export async function apiCreate(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function apiUpdate(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function apiDelete(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}


