import api from '../lib/axios';

interface RequestOptions {
  isPublic?: boolean;
  params?: any;
}

class ApiService {
  // Méthode de base pour centraliser la configuration
  private async request<T>(method: string, url: string, data: any = null, options: RequestOptions = {}) {
    const config = {
      method,
      url,
      data,
      params: options.params,
      // Si c'est public, on peut dire à l'intercepteur de ne pas refresh en cas d'erreur
      _noRetry: options.isPublic 
    };

    const response = await api.request<T>(config);
    return response.data;
  }

  // GET - Par défaut on peut le mettre en public pour le catalogue
  async get<T>(url: string, options: RequestOptions = { isPublic: false }) {
    return this.request<T>('GET', url, null, options);
  }

  // POST - Souvent privé (création de commande, etc.)
  async post<T>(url: string, data: any, options: RequestOptions = { isPublic: false }) {
    return this.request<T>('POST', url, data, options);
  }

  // PUT
  async put<T>(url: string, data: any, options: RequestOptions = { isPublic: false }) {
    return this.request<T>('PUT', url, data, options);
  }

  // PATCH
  async patch<T>(url: string, data: any, options: RequestOptions = { isPublic: false }) {
    return this.request<T>('PATCH', url, data, options);
  }

  // DELETE
  async delete<T>(url: string, options: RequestOptions = { isPublic: false }) {
    return this.request<T>('DELETE', url, null, options);
  }
}

export const apiService = new ApiService();