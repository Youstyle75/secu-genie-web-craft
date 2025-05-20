
// Configuration des endpoints API

interface ApiConfig {
  baseUrl: string;
  endpoints: {
    auth: {
      login: string;
      register: string;
      logout: string;
      resetPassword: string;
    };
    documents: {
      list: string;
      create: string;
      update: (id: string) => string;
      delete: (id: string) => string;
      sign: (id: string) => string;
      export: (id: string) => string;
    };
    establishments: {
      list: string;
      create: string;
      get: (id: string) => string;
      update: (id: string) => string;
      delete: (id: string) => string;
    };
    ia: {
      generateText: string;
      chatbot: string;
      analyseDocument: string;
    };
    reglementation: {
      search: string;
      getArticle: (id: string) => string;
      getLatestUpdates: string;
    };
  };
  timeouts: {
    default: number;
    upload: number;
  };
}

// Configuration pour l'environnement de développement
const devConfig: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      resetPassword: '/auth/reset-password',
    },
    documents: {
      list: '/documents',
      create: '/documents',
      update: (id) => `/documents/${id}`,
      delete: (id) => `/documents/${id}`,
      sign: (id) => `/documents/${id}/sign`,
      export: (id) => `/documents/${id}/export-pdf`,
    },
    establishments: {
      list: '/establishments',
      create: '/establishments',
      get: (id) => `/establishments/${id}`,
      update: (id) => `/establishments/${id}`,
      delete: (id) => `/establishments/${id}`,
    },
    ia: {
      generateText: '/ia/generate-text',
      chatbot: '/ia/chatbot',
      analyseDocument: '/ia/analyse-document',
    },
    reglementation: {
      search: '/reglementation/search',
      getArticle: (id) => `/reglementation/article/${id}`,
      getLatestUpdates: '/reglementation/updates',
    },
  },
  timeouts: {
    default: 10000, // 10 secondes
    upload: 60000, // 60 secondes pour les uploads
  },
};

// Configuration pour l'environnement de production
const prodConfig: ApiConfig = {
  ...devConfig,
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.secugenie.com',
};

// Exporter la configuration en fonction de l'environnement
const apiConfig: ApiConfig = import.meta.env.DEV ? devConfig : prodConfig;

export default apiConfig;
