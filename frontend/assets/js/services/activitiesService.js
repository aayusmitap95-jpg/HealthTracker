const API_URL = window.ENV.ACTIVITIES_API;

export const apiGetAll = () =>
  fetch(API_URL).then(r => r.json());

export const apiGetOne = id =>
  fetch(`${API_URL}/${id}`).then(r => r.json());

export const apiCreate = data =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const apiUpdate = (id, data) =>
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const apiDelete = id =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" });

