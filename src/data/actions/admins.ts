import { APIResponse } from "@/lib/types";
import { CreateUserFormSchema, FormState } from "@/lib/validators";
import { apiService } from "@/services/ApiService";

export async function getUsersAction() {
  try {
    const [agents, roles] = await Promise.all([
      apiService.get<APIResponse>("/users"),
      apiService.get<APIResponse>("/roles"),
    ]);
    return { agents: agents.data ?? [], roles: roles.data ?? [] };
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function createUserAction(data:any) {
  try {
    const response = await apiService.post<APIResponse>("/users", data );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}