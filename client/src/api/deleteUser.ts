import { API_URL } from "./config";

export async function deleteUser(userId: string) {
  await fetch(`${API_URL}/register/${userId}`, {
    method: "DELETE",
  });
}
