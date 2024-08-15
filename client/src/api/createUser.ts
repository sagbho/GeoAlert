import { API_URL } from "./config";

export async function createUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
