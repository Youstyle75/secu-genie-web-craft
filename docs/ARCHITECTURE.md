# Architecture SecuGenie

## Vue d'ensemble

SecuGenie est une application web full-stack moderne utilisant une architecture JAMstack avec backend serverless.

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │    Hooks     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────────────────────────────────────────┐      │
│  │          React Query (State Management)           │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  SUPABASE CLIENT SDK                         │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   LOVABLE CLOUD BACKEND                      │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐      │
│  │ PostgreSQL │  │   Auth     │  │  Edge Functions  │      │
│  │    +RLS    │  │  (JWT)     │  │   (Serverless)   │      │
│  └────────────┘  └────────────┘  └──────────────────┘      │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐      │
│  │  Storage   │  │  Realtime  │  │   Lovable AI     │      │
│  │ (S3-like)  │  │  (WebRTC)  │  │  (GPT-5/Gemini)  │      │
│  └────────────┘  └────────────┘  └──────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                          │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐      │
│  │ Légifrance │  │  IP Geoloc │  │   Email (SMTP)   │      │
│  │    API     │  │   Service  │  │                  │      │
│  └────────────┘  └────────────┘  └──────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Stack technique détaillée

### Frontend

**Framework principal : React 18**
- Composants fonctionnels avec Hooks
- TypeScript strict pour la sécurité des types
- Code splitting automatique via React.lazy()

**Build Tool : Vite**
- Hot Module Replacement (HMR) ultra-rapide
- Build optimisé avec Rollup
- Support natif TypeScript et JSX
- Plugin SWC pour transpilation rapide

**Styling : Tailwind CSS**
- Utility-first CSS framework
- Design system personnalisé via `index.css`
- Tokens sémantiques (couleurs, espacements)
- Responsive design mobile-first
- Dark mode supporté

**Composants UI : shadcn/ui**
- Composants accessibles (ARIA)
- Basés sur Radix UI primitives
- Personnalisables via CVA (Class Variance Authority)
- Plus de 40 composants disponibles

**Routing : React Router v6**
- Routing déclaratif
- Protected routes avec AuthContext
- Navigation programmatique
- Lazy loading des routes

**State Management**
- **Local State** : useState, useReducer
- **Server State** : TanStack Query (React Query)
  - Cache intelligent
  - Refetch automatique
  - Optimistic updates
  - Pagination et infinite queries
- **Context** : React Context API pour l'authentification

**Forms : React Hook Form + Zod**
- Validation déclarative avec schémas Zod
- Performance optimisée (moins de re-renders)
- Intégration avec shadcn/ui Form components
- Gestion d'erreurs robuste

### Backend (Lovable Cloud / Supabase)

**Base de données : PostgreSQL 15**
- ACID compliant
- Triggers pour automatisation
- Functions pour logique métier
- Extensions : pg_trgm (full-text search)

**Row Level Security (RLS)**
- Sécurité au niveau de la ligne
- Policies basées sur auth.uid()
- Isolation complète entre utilisateurs
- Protection contre les accès non autorisés

**Authentification**
- JWT tokens (access + refresh)
- Email/password natif
- Auto-confirm emails (dev)
- Sessions sécurisées
- TOTP 2FA personnalisé

**Storage**
- Bucket `plans` pour les fichiers
- RLS sur storage.objects
- Upload/download sécurisés
- Gestion des métadonnées

**Edge Functions (Deno)**
- `ai-assistant` : Génération de contenu IA
- `secubot-chat` : Chatbot réglementaire
- `legifrance-auth` : Authentification API Légifrance
- `legifrance-sync` : Synchronisation données réglementaires
- Auto-scaling
- Cold start < 100ms

**Lovable AI**
- Pas de clé API requise
- Modèles supportés :
  - GPT-5 (OpenAI) : raisonnement complexe
  - Gemini 2.5 Pro/Flash (Google) : multimodal
- Usage-based pricing
- Rate limiting intégré

## Flux de données

### 1. Authentification

```
User → Login Form → Supabase Auth
                          ↓
                    JWT Token (httpOnly cookie)
                          ↓
                    AuthContext (React)
                          ↓
                Protected Routes accessible
```

### 2. Récupération de données

```
Component → useQuery (React Query)
                ↓
        Supabase Client SDK
                ↓
        PostgreSQL + RLS check
                ↓
        Cache (React Query)
                ↓
        Component Re-render
```

### 3. Mutation de données

```
User Action → useMutation (React Query)
                    ↓
            Optimistic Update (UI)
                    ↓
            Supabase Client SDK
                    ↓
            PostgreSQL + RLS + Triggers
                    ↓
            Cache Invalidation
                    ↓
            Refetch + UI Update
```

### 4. Génération IA

```
User → AI Form → Edge Function (ai-assistant)
                        ↓
                  Lovable AI API
                        ↓
                GPT-5 / Gemini 2.5
                        ↓
                Streaming Response
                        ↓
                Real-time UI Update
```

### 5. Chatbot réglementaire

```
User Question → Edge Function (secubot-chat)
                        ↓
                Context enrichment
                        ↓
                Lovable AI API (GPT-5)
                        ↓
                + Légifrance API
                        ↓
                Formatted Response
                        ↓
                Chat UI Update
```

## Patterns et bonnes pratiques

### 1. Component Architecture

**Atomic Design**
- Atoms : Buttons, Inputs (shadcn/ui)
- Molecules : FormFields, Cards
- Organisms : Forms, Tables
- Templates : Layouts
- Pages : Routes

**Separation of Concerns**
```typescript
// ✅ Bon : Logique séparée
const useProjectData = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId)
  });
};

function ProjectDetail({ projectId }: Props) {
  const { data, isLoading } = useProjectData(projectId);
  // Rendering logic only
}

// ❌ Mauvais : Tout dans le composant
function ProjectDetail({ projectId }: Props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch logic + state management + side effects
  }, [projectId]);
}
```

### 2. Data Fetching

**React Query patterns**
```typescript
// Query avec cache intelligent
const { data, isLoading, error } = useQuery({
  queryKey: ['projects', userId],
  queryFn: fetchProjects,
  staleTime: 5 * 60 * 1000, // 5 min
  cacheTime: 10 * 60 * 1000, // 10 min
});

// Mutation avec optimistic update
const mutation = useMutation({
  mutationFn: updateProject,
  onMutate: async (newData) => {
    await queryClient.cancelQueries(['project', id]);
    const previous = queryClient.getQueryData(['project', id]);
    queryClient.setQueryData(['project', id], newData);
    return { previous };
  },
  onError: (err, variables, context) => {
    queryClient.setQueryData(['project', id], context.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries(['project', id]);
  },
});
```

### 3. Security Patterns

**Client-side encryption**
```typescript
// Chiffrement avant envoi
const encryptedData = await encryptData(sensitiveData, userKey);
await supabase.from('documents').insert({ 
  content: encryptedData 
});

// Déchiffrement après réception
const decryptedData = await decryptData(data.content, userKey);
```

**Audit logging**
```typescript
// Log automatique via helper
await logAction({
  action: 'document.update',
  resourceType: 'document',
  resourceId: doc.id,
  metadata: { changes }
});
```

**Rate limiting**
```typescript
// Vérification côté edge function
const isAllowed = await checkRateLimit({
  identifier: userId,
  action: 'document.create',
  limit: 10,
  window: '1 hour'
});
```

### 4. Error Handling

**Boundary pattern**
```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

**Query error handling**
```typescript
const { data, error } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  retry: 3,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  onError: (error) => {
    toast.error(error.message);
    logError(error);
  }
});
```

### 5. Performance Optimization

**Code splitting**
```typescript
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));

<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

**Memoization**
```typescript
const expensiveComputation = useMemo(
  () => computeExpensiveValue(data),
  [data]
);

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

## Base de données

### Schema principal

```sql
-- Profiles (extension de auth.users)
profiles
├── id (uuid, PK)
├── user_id (uuid, FK → auth.users)
├── nom (text)
├── prenom (text)
├── organization (text, nullable)
├── phone_number (text, nullable)
├── avatar_url (text, nullable)
└── timestamps

-- Projects
projects
├── id (uuid, PK)
├── user_id (uuid, FK → profiles)
├── name (text)
├── type (text) -- 'erp', 'construction', etc.
├── status (text) -- 'draft', 'active', 'completed'
├── location (text)
├── capacity (int)
├── description (text)
├── metadata (jsonb)
├── plan_data (jsonb) -- Canvas data
└── timestamps

-- Documents
documents
├── id (uuid, PK)
├── project_id (uuid, FK → projects)
├── user_id (uuid, FK → profiles)
├── type (text) -- 'ppsps', 'plan_prevention', 'notice_gn6'
├── title (text)
├── status (text) -- 'draft', 'review', 'approved', 'signed'
├── version (int)
├── content (jsonb)
├── file_url (text, nullable)
├── metadata (jsonb)
└── timestamps

-- Signatures
signatures
├── id (uuid, PK)
├── document_id (uuid, FK → documents)
├── user_id (uuid, FK → profiles)
├── signature_data (text) -- Base64 image
├── signed_at (timestamp)
├── ip_address (text)
├── certificate_data (jsonb)
└── created_at

-- Comments
comments
├── id (uuid, PK)
├── document_id (uuid, FK → documents)
├── user_id (uuid, FK → profiles)
├── content (text)
├── metadata (jsonb) -- position, mentions
└── timestamps

-- Notifications
notifications
├── id (uuid, PK)
├── user_id (uuid, FK → profiles)
├── type (text) -- 'comment', 'mention', 'signature'
├── title (text)
├── message (text)
├── link (text)
├── read (boolean)
├── metadata (jsonb)
└── created_at

-- Audit Logs
audit_logs
├── id (uuid, PK)
├── user_id (uuid, FK → profiles, nullable)
├── action (text)
├── resource_type (text)
├── resource_id (uuid)
├── ip_address (text)
├── user_agent (text)
├── metadata (jsonb)
└── created_at

-- User Consents (RGPD)
user_consents
├── id (uuid, PK)
├── user_id (uuid, FK → profiles)
├── cookie_consent (boolean)
├── data_processing_consent (boolean)
├── marketing_consent (boolean)
└── timestamps

-- User TOTP Secrets (2FA)
user_totp_secrets
├── id (uuid, PK)
├── user_id (uuid, FK → profiles)
├── secret (text) -- encrypted
├── backup_codes (text[])
├── verified (boolean)
└── timestamps

-- Rate Limits
rate_limits
├── id (uuid, PK)
├── identifier (text) -- user_id or IP
├── action (text)
├── count (int)
├── window_start (timestamp)
└── created_at
```

### RLS Policies

Toutes les tables utilisent RLS avec la règle de base :
```sql
auth.uid() = user_id
```

Exceptions :
- `rate_limits` : Pas de RLS (géré par backend)
- `audit_logs` : INSERT autorisé pour le système

## Déploiement

### Production Build

```bash
npm run build
```

Optimisations automatiques :
- Minification JS/CSS
- Tree shaking
- Code splitting
- Asset hashing
- Compression gzip/brotli

### Environment

**Development**
- Auto-reload (HMR)
- Source maps
- Dev tools enabled
- Verbose logging

**Production**
- Minified bundles
- No source maps
- Error reporting
- Performance monitoring

## Monitoring & Observabilité

### Frontend
- Error Boundary pour catch errors
- Console logs (dev only)
- Performance metrics (Web Vitals)

### Backend
- Supabase Dashboard pour métriques
- Edge function logs
- Database slow queries
- Auth metrics

### Sécurité
- Audit logs pour toutes actions sensibles
- Rate limiting monitoring
- Failed login attempts tracking

## Évolutivité

### Horizontal scaling
- Edge functions auto-scale
- PostgreSQL connection pooling
- CDN pour assets statiques

### Vertical scaling
- Database upgrade possible
- Storage illimité

### Cache strategy
- React Query cache (client)
- PostgreSQL query cache
- CDN cache (assets)
