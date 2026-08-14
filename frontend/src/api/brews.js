const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function handleResponse(res) {
  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.error || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.details = data?.details;
    throw error;
  }

  return data;
}

export async function fetchBrews(method) {
  const url = new URL(`${API_URL}/api/brews`);
  if (method) url.searchParams.set("method", method);
  const res = await fetch(url);
  return handleResponse(res);
}

export async function createBrew(payload) {
  const res = await fetch(`${API_URL}/api/brews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateBrew(id, payload) {
  const res = await fetch(`${API_URL}/api/brews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteBrew(id) {
  const res = await fetch(`${API_URL}/api/brews/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
