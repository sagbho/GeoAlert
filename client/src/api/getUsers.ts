import { API_URL } from "./config";

export async function getUsers() {
  const response = await fetch(`${API_URL}/register`);
  return response.json();
}
