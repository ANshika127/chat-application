const API_BASE_URL = "http://127.0.0.1:5000";

async function apiRequest(path, options={}) {
  const { token, body, headers={}, ...rest } = options;

  const requestHeaders = {
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if(token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`,{
    ...rest,
    method: rest.method || "GET",
    headers: requestHeaders,
    ...(body !== undefined
      ? { body: JSON.stringify(body) }
      : {}),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.error || data?.message || `Request failed: ${response.status}`
    );
  }
  return data;
}

async function registerUser(userData) {
  return apiRequest("/users/register",{
    method: "POST",
    body: userData,
  });
}

async function loginUser(credentials){
  return apiRequest("/users/login",{
    method:"POST",
    body: credentials
  });
}
export { API_BASE_URL, apiRequest, registerUser, loginUser};

