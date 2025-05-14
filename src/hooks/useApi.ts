
import { useState } from 'react';
import { apiConfig, formatEndpoint } from '@/config/api';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  requiresAuth?: boolean;
}

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: (endpoint: string, options?: ApiOptions) => Promise<T | null>;
}

export function useApi<T>(): ApiResponse<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const getAuthToken = () => {
    // Dans un environnement réel, récupérez le token d'authentification
    // depuis localStorage, un state global ou ailleurs
    return localStorage.getItem('auth_token');
  };

  const fetchData = async (
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<T | null> => {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = apiConfig.timeout,
      requiresAuth = true,
    } = options;

    setLoading(true);
    setError(null);

    // Construire l'URL complète
    const url = `${apiConfig.baseUrl}${endpoint}`;
    
    // Préparer les headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Ajouter le token d'authentification si nécessaire
    if (requiresAuth) {
      const token = getAuthToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    // Configuration de la requête
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error: ${response.status}`);
      }

      // Si la réponse est vide ou 204 No Content
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        setLoading(false);
        return null;
      }

      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
      return responseData;
    } catch (err: any) {
      clearTimeout(timeoutId);
      
      // Gérer les erreurs d'expiration
      if (err.name === 'AbortError') {
        setError(new Error('La requête a expiré'));
      } else {
        setError(err);
      }
      
      setLoading(false);
      return null;
    }
  };

  return { data, loading, error, fetchData };
}

// Utilitaires pour les endpoints communs
export const documentEndpoints = {
  getList: () => apiConfig.endpoints.documents.base,
  getById: (id: string) => formatEndpoint(`${apiConfig.endpoints.documents.base}/:id`, { id }),
  create: (type: 'noticeSecurite' | 'planPrevention' | 'gn6') => {
    switch (type) {
      case 'noticeSecurite': return apiConfig.endpoints.documents.noticeSecurite;
      case 'planPrevention': return apiConfig.endpoints.documents.planPrevention;
      case 'gn6': return apiConfig.endpoints.documents.gn6;
    }
  },
  sign: (id: string) => formatEndpoint(apiConfig.endpoints.documents.sign, { id }),
  exportPdf: (id: string) => formatEndpoint(apiConfig.endpoints.documents.export, { id }),
};

export const aiEndpoints = {
  generateText: () => apiConfig.endpoints.ai.generateText,
};
