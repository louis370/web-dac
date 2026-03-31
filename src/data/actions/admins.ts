import { APIResponse } from "@/lib/types";
import { apiService } from "@/services/ApiService";

export async function getUsersAction() {
  try {
    const response = await apiService.get<APIResponse>("/users");
    const roles = await apiService.get<APIResponse>("/roles");
    return { agents: response.data ?? [], roles: roles.data ?? [] };
  } catch (error) {
    console.log(error);
    return null;
  }
}
