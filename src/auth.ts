import { config } from "./config";

/**
 * Fetches a session token from the server.
 * @returns The session token as a string.
 * @throws If the request fails or the token cannot be retrieved.
 */
export async function fetchSessionToken(): Promise<string> {
  const res = await fetch(`${config.baseUrl}/`);
  if (!res.ok) throw new Error("Failed to communicate with server");

  const cookie = res.headers.get("set-cookie") ?? "";
  const token = cookie.split(" ")[0];
  if (!token) throw new Error("Failed to retrieve session token");

  return token;
}

/**
 * Logs in a user and returns the session cookie.
 * @param sessionId
 * @param admno
 * @param password
 * @returns
 */
export async function login(
  sessionId: string,
  admno: string,
  password: string,
): Promise<string> {
  if (!sessionId) throw new Error("sessionId is empty");

  const res = await fetch(`${config.baseUrl}/Login/LoginUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionId,
    },
    body: JSON.stringify({ Username: admno, Password: password }),
  });

  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

  const body = await res.json();
  if (!body.success) throw new Error(body.message ?? "Login failed");

  const newCookie = res.headers.get("set-cookie") ?? "";
  const userSession = `${sessionId} ${newCookie}`.trim();
  if (!userSession) throw new Error("Failed to retrieve user session");

  return userSession;
}
