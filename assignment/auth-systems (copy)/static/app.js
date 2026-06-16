const TOKEN_KEY = "auth_token";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  return password.length >= 6 && /[^A-Za-z0-9]/.test(password);
}

function showMessage(elementId, message, type) {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }

  if (!message) {
    element.className = "hidden";
    element.textContent = "";
    return;
  }

  const palette =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-rose-200 bg-rose-50 text-rose-700";

  element.className = "rounded-2xl border px-4 py-3 text-sm " + palette;
  element.textContent = message;
}

function setLoading(buttonId, isLoading, label) {
  const button = document.getElementById(buttonId);
  if (!button) {
    return;
  }

  button.disabled = isLoading;
  button.textContent = isLoading ? "Please wait..." : label;
  button.classList.toggle("opacity-70", isLoading);
  button.classList.toggle("cursor-not-allowed", isLoading);
}

async function apiRequest(path, options = {}) {
  const headers = Object.assign(
    {
      "Content-Type": "application/json",
    },
    options.headers || {}
  );

  const token = getToken();
  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  let data = null;
  let text = "";
  try {
    data = await response.json();
  } catch (error) {
    try {
      text = await response.text();
    } catch (textError) {
      text = "";
    }
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && (data.detail || data.message)) ||
      text ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
}

function redirectIfAuthenticated() {
  if (getToken()) {
    window.location.href = "/dashboard";
  }
}

async function requireAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = "/login";
    return null;
  }

  try {
    return await apiRequest("/api/me", { method: "GET" });
  } catch (error) {
    clearToken();
    window.location.href = "/login";
    return null;
  }
}

async function logoutAndRedirect() {
  try {
    await apiRequest("/auth/logout", { method: "POST" });
  } catch (error) {
  }
  clearToken();
  window.location.href = "/login";
}

function bindLogoutButtons() {
  document.querySelectorAll("[data-action='logout']").forEach((button) => {
    button.addEventListener("click", logoutAndRedirect);
  });
}
