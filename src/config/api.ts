
type Environment = 'development' | 'staging' | 'production';

// Détection de l'environnement (à adapter selon votre système)
const ENV: Environment = (import.meta.env.MODE as Environment) || 'development';

interface ApiConfig {
  baseUrl: string;
  endpoints: {
    documents: {
      base: string;
      noticeSecurite: string;
      planPrevention: string;
      gn6: string;
      sign: string;
      export: string;
    };
    ai: {
      generateText: string;
    };
    signature: {
      verify: string;
    };
    establishments: {
      base: string;
      events: string;
    };
  };
  timeout: number;
}

const API_CONFIG: Record<Environment, ApiConfig> = {
  development: {
    baseUrl: 'http://localhost:3000/api',
    endpoints: {
      documents: {
        base: '/documents',
        noticeSecurite: '/documents/notice-securite',
        planPrevention: '/documents/plan-prevention',
        gn6: '/documents/gn6',
        sign: '/documents/:id/sign',
        export: '/documents/:id/export-pdf',
      },
      ai: {
        generateText: '/ai/generate-text',
      },
      signature: {
        verify: '/signature/verify',
      },
      establishments: {
        base: '/establishments',
        events: '/establishments/events',
      },
    },
    timeout: 30000, // 30 seconds
  },
  staging: {
    baseUrl: 'https://api-staging.secugenie.fr/api',
    endpoints: {
      documents: {
        base: '/documents',
        noticeSecurite: '/documents/notice-securite',
        planPrevention: '/documents/plan-prevention',
        gn6: '/documents/gn6',
        sign: '/documents/:id/sign',
        export: '/documents/:id/export-pdf',
      },
      ai: {
        generateText: '/ai/generate-text',
      },
      signature: {
        verify: '/signature/verify',
      },
      establishments: {
        base: '/establishments',
        events: '/establishments/events',
      },
    },
    timeout: 30000,
  },
  production: {
    baseUrl: 'https://api.secugenie.fr/api',
    endpoints: {
      documents: {
        base: '/documents',
        noticeSecurite: '/documents/notice-securite',
        planPrevention: '/documents/plan-prevention',
        gn6: '/documents/gn6',
        sign: '/documents/:id/sign',
        export: '/documents/:id/export-pdf',
      },
      ai: {
        generateText: '/ai/generate-text',
      },
      signature: {
        verify: '/signature/verify',
      },
      establishments: {
        base: '/establishments',
        events: '/establishments/events',
      },
    },
    timeout: 15000, // 15 secondes en production pour éviter les timeouts
  },
};

export const apiConfig = API_CONFIG[ENV];

export const formatEndpoint = (endpoint: string, params: Record<string, string | number> = {}): string => {
  let formattedEndpoint = endpoint;
  
  // Remplacer les paramètres dans l'URL
  Object.entries(params).forEach(([key, value]) => {
    formattedEndpoint = formattedEndpoint.replace(`:${key}`, String(value));
  });
  
  return formattedEndpoint;
};

export default apiConfig;
