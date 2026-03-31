import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers:{
    'Content-Type': 'application/json',
    'x-app-type': process.env.NEXT_PUBLIC_APP_TYPE || 'dac-dashboard',
  }
});

// 1. Intercepteur de Requête : Ajoute le token à chaque appel
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Intercepteur de Réponse : Gère l'expiration (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Erreur interceptée:", error.response?.status, originalRequest.url);

    // Si erreur 401 et que ce n'est pas déjà une tentative de refresh
   if (error.response?.status === 401 && !originalRequest._retry && !originalRequest._noRetry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        
        // Appel à NestJS pour rafraîchir le token
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = res.data;
        
        // Mise à jour du store Zustand
        useAuthStore.getState().setTokens(access_token, refresh_token);

        // Relancer la requête initiale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si le refresh échoue aussi (ex: refresh token expiré), on déconnecte
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;