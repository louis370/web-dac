import { clearSession, createSession } from "@/lib/sessions";
import { APIResponse } from "@/lib/types";
import { FormState, LoginFormSchema } from "@/lib/validators";
import { apiService } from "@/services/ApiService";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

export async function loginAction(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let success = false;

  try {
    const response = await apiService.put<APIResponse>(
      "/auth/login",
      {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      },
      { isPublic: true },
    );

    await createSession({
      refreshToken: response.data.refresh_token,
    });
    useAuthStore.getState().setTokens(response.data.access_token);
    success = true;
  } catch (e: any) {
    console.log("Login error:", e.response?.data || e.message || e);
    if (e.response) {
      if (e.response.status == 401) {
        return {
          message: "Email ou mot de passe incorrect",
        };
      } else if (e.response.status == 404) {
        return {
          message: "Utilisateur non trouvé",
        };
      } else {
        return {
          message: "Une erreur est survenue. Veuillez réessayer.",
        };
      }
    }
    return {
      message: "Une erreur est survenue. Veuillez réessayer.",
    };
  }

  if (success) {
    redirect("/");
  }
}

export async function logoutAction() {
  useAuthStore.getState().logout();
  await clearSession();
  redirect("/auth/login");
}
