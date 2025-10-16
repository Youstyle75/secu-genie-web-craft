# Documentation API SecuGenie

## Overview

SecuGenie utilise Lovable Cloud (Supabase) pour la gestion des données. L'accès se fait via le SDK JavaScript Supabase avec Row Level Security (RLS) automatique.

## Configuration

```typescript
import { supabase } from '@/integrations/supabase/client';
```

**URL de base** : `https://oejwidbngxxelnivzcxs.supabase.co`

**Authentication** : JWT Bearer token (automatique via SDK)

## Tables & Endpoints

### Profiles

Stocke les informations complémentaires des utilisateurs.

**Schema**
```typescript
interface Profile {
  id: string;
  user_id: string;
  nom: string;
  prenom: string;
  organization?: string;
  phone_number?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}
```

**Opérations**

```typescript
// SELECT - Lire son profil
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', userId)
  .single();

// INSERT - Créer un profil (automatique via trigger)
// Déclenché automatiquement à l'inscription

// UPDATE - Mettre à jour son profil
const { data, error } = await supabase
  .from('profiles')
  .update({
    nom: 'Dupont',
    prenom: 'Jean',
    organization: 'Entreprise XYZ',
    phone_number: '+33612345678'
  })
  .eq('user_id', userId);
```

**RLS Policies**
- SELECT, INSERT, UPDATE : `auth.uid() = user_id`
- DELETE : Non autorisé

---

### Projects

Gestion des projets/chantiers.

**Schema**
```typescript
interface Project {
  id: string;
  user_id: string;
  name: string;
  type: 'erp' | 'construction' | 'industrial' | 'other';
  status: 'draft' | 'active' | 'completed' | 'archived';
  location?: string;
  capacity?: number;
  description?: string;
  erp_type?: string;
  metadata?: Record<string, any>;
  plan_data?: Record<string, any>; // Canvas state
  created_at: string;
  updated_at: string;
}
```

**Opérations**

```typescript
// SELECT - Lister ses projets
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });

// SELECT - Récupérer un projet
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('id', projectId)
  .eq('user_id', userId)
  .single();

// INSERT - Créer un projet
const { data, error } = await supabase
  .from('projects')
  .insert({
    user_id: userId,
    name: 'Chantier Boulevard Haussmann',
    type: 'construction',
    status: 'draft',
    location: 'Paris, France',
    capacity: 150,
    description: 'Rénovation complète'
  })
  .select()
  .single();

// UPDATE - Mettre à jour un projet
const { data, error } = await supabase
  .from('projects')
  .update({
    status: 'active',
    plan_data: canvasState
  })
  .eq('id', projectId)
  .eq('user_id', userId);

// DELETE - Supprimer un projet
const { data, error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId)
  .eq('user_id', userId);
```

**RLS Policies**
- SELECT, INSERT, UPDATE, DELETE : `auth.uid() = user_id`

---

### Documents

Gestion des documents réglementaires (PPSPS, Plans, Notices).

**Schema**
```typescript
interface Document {
  id: string;
  project_id: string;
  user_id: string;
  type: 'ppsps' | 'plan_prevention' | 'notice_gn6' | 'other';
  title: string;
  status: 'draft' | 'review' | 'approved' | 'signed';
  version: number;
  content?: Record<string, any>; // Form data
  file_url?: string; // PDF URL
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}
```

**Opérations**

```typescript
// SELECT - Lister les documents d'un projet
const { data, error } = await supabase
  .from('documents')
  .select('*')
  .eq('project_id', projectId)
  .eq('user_id', userId)
  .order('created_at', { ascending: false });

// INSERT - Créer un document
const { data, error } = await supabase
  .from('documents')
  .insert({
    project_id,
    user_id: userId,
    type: 'ppsps',
    title: 'PPSPS - Chantier Haussmann',
    status: 'draft',
    version: 1,
    content: formData
  })
  .select()
  .single();

// UPDATE - Mettre à jour un document
const { data, error } = await supabase
  .from('documents')
  .update({
    content: updatedFormData,
    status: 'review',
    version: version + 1
  })
  .eq('id', documentId)
  .eq('user_id', userId);
```

**RLS Policies**
- SELECT, INSERT, UPDATE, DELETE : `auth.uid() = user_id`

---

### Signatures

Gestion des signatures électroniques sur les documents.

**Schema**
```typescript
interface Signature {
  id: string;
  document_id: string;
  user_id: string;
  signature_data: string; // Base64 image
  signed_at: string;
  ip_address?: string;
  certificate_data?: Record<string, any>;
  created_at: string;
}
```

**Opérations**

```typescript
// SELECT - Récupérer les signatures d'un document
const { data, error } = await supabase
  .from('signatures')
  .select('*, profiles(nom, prenom)')
  .eq('document_id', documentId);

// INSERT - Signer un document
const { data, error } = await supabase
  .from('signatures')
  .insert({
    document_id,
    user_id: userId,
    signature_data: signatureBase64,
    signed_at: new Date().toISOString(),
    ip_address: userIp,
    certificate_data: {
      timestamp: Date.now(),
      hash: documentHash
    }
  })
  .select()
  .single();
```

**RLS Policies**
- SELECT : Document accessible par l'utilisateur
- INSERT : Document accessible par l'utilisateur
- UPDATE, DELETE : Non autorisé

---

### Comments

Système de commentaires collaboratifs.

**Schema**
```typescript
interface Comment {
  id: string;
  document_id: string;
  user_id: string;
  content: string;
  metadata?: {
    position?: { x: number; y: number };
    mentions?: string[];
    resolved?: boolean;
  };
  created_at: string;
  updated_at: string;
}
```

**Opérations**

```typescript
// SELECT - Lister les commentaires d'un document
const { data, error } = await supabase
  .from('comments')
  .select('*, profiles(nom, prenom, avatar_url)')
  .eq('document_id', documentId)
  .order('created_at', { ascending: true });

// INSERT - Ajouter un commentaire
const { data, error } = await supabase
  .from('comments')
  .insert({
    document_id,
    user_id: userId,
    content: 'Attention à la section sécurité',
    metadata: {
      position: { x: 100, y: 200 },
      mentions: ['@user123']
    }
  })
  .select()
  .single();
```

**RLS Policies**
- SELECT, INSERT : Document accessible par l'utilisateur

---

### Notifications

Système de notifications utilisateur.

**Schema**
```typescript
interface Notification {
  id: string;
  user_id: string;
  type: 'comment' | 'mention' | 'signature' | 'system';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  metadata?: Record<string, any>;
  created_at: string;
}
```

**Opérations**

```typescript
// SELECT - Lister ses notifications
const { data, error } = await supabase
  .from('notifications')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(50);

// UPDATE - Marquer comme lue
const { data, error } = await supabase
  .from('notifications')
  .update({ read: true })
  .eq('id', notificationId)
  .eq('user_id', userId);
```

**RLS Policies**
- SELECT, UPDATE : `auth.uid() = user_id`

---

### Audit Logs

Logs d'audit pour traçabilité.

**Schema**
```typescript
interface AuditLog {
  id: string;
  user_id?: string;
  action: string; // 'login', 'document.create', etc.
  resource_type: string;
  resource_id?: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  created_at: string;
}
```

**Opérations**

```typescript
// SELECT - Consulter ses logs
const { data, error } = await supabase
  .from('audit_logs')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(100);

// INSERT - Log automatique (via helper)
import { logAction } from '@/lib/security/audit';

await logAction({
  action: 'document.sign',
  resourceType: 'document',
  resourceId: documentId,
  metadata: { version: 1 }
});
```

**RLS Policies**
- SELECT : `auth.uid() = user_id`
- INSERT : Autorisé pour le système

---

### User Consents

Gestion des consentements RGPD.

**Schema**
```typescript
interface UserConsent {
  id: string;
  user_id: string;
  cookie_consent: boolean;
  data_processing_consent: boolean;
  marketing_consent: boolean;
  created_at: string;
  updated_at: string;
}
```

**Opérations**

```typescript
// SELECT - Récupérer ses consentements
const { data, error } = await supabase
  .from('user_consents')
  .select('*')
  .eq('user_id', userId)
  .single();

// INSERT/UPDATE - Mettre à jour les consentements
const { data, error } = await supabase
  .from('user_consents')
  .upsert({
    user_id: userId,
    cookie_consent: true,
    data_processing_consent: true,
    marketing_consent: false
  });
```

---

### User TOTP Secrets

Gestion 2FA (Two-Factor Authentication).

**Schema**
```typescript
interface UserTOTPSecret {
  id: string;
  user_id: string;
  secret: string; // Encrypted
  backup_codes: string[];
  verified: boolean;
  created_at: string;
  updated_at: string;
}
```

**Opérations**

```typescript
// SELECT - Vérifier si 2FA activé
const { data, error } = await supabase
  .from('user_totp_secrets')
  .select('verified')
  .eq('user_id', userId)
  .single();

// INSERT - Configurer 2FA
import { generateTOTPSecret } from '@/lib/security/totp';

const secret = generateTOTPSecret();
const backupCodes = generateBackupCodes();

const { data, error } = await supabase
  .from('user_totp_secrets')
  .insert({
    user_id: userId,
    secret: encrypt(secret),
    backup_codes: backupCodes,
    verified: false
  });

// UPDATE - Valider 2FA
const { data, error } = await supabase
  .from('user_totp_secrets')
  .update({ verified: true })
  .eq('user_id', userId);
```

---

## Storage

### Bucket: plans

Stockage des plans et fichiers de chantier.

**Upload**
```typescript
const { data, error } = await supabase.storage
  .from('plans')
  .upload(`${userId}/${projectId}/plan.png`, file, {
    contentType: 'image/png',
    upsert: false
  });
```

**Download**
```typescript
const { data, error } = await supabase.storage
  .from('plans')
  .download(`${userId}/${projectId}/plan.png`);
```

**Get Public URL**
```typescript
const { data } = supabase.storage
  .from('plans')
  .getPublicUrl(`${userId}/${projectId}/plan.png`);
```

**Delete**
```typescript
const { data, error } = await supabase.storage
  .from('plans')
  .remove([`${userId}/${projectId}/plan.png`]);
```

**RLS Policies**
- Utilisateur peut uploader/lire/supprimer uniquement ses fichiers

---

## Edge Functions

### ai-assistant

Génération de contenu avec IA.

**Endpoint** : `https://oejwidbngxxelnivzcxs.supabase.co/functions/v1/ai-assistant`

**Request**
```typescript
const { data, error } = await supabase.functions.invoke('ai-assistant', {
  body: {
    prompt: 'Génère un PPSPS pour un chantier de rénovation',
    context: {
      projectType: 'renovation',
      location: 'Paris',
      workers: 15
    },
    model: 'openai/gpt-5' // ou 'google/gemini-2.5-pro'
  }
});
```

**Response**
```typescript
{
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
```

---

### secubot-chat

Chatbot réglementaire interactif.

**Endpoint** : `https://oejwidbngxxelnivzcxs.supabase.co/functions/v1/secubot-chat`

**Request**
```typescript
const { data, error } = await supabase.functions.invoke('secubot-chat', {
  body: {
    message: 'Quelles sont les obligations pour un PPSPS?',
    conversationHistory: [
      { role: 'user', content: 'Bonjour' },
      { role: 'assistant', content: 'Bonjour, comment puis-je vous aider?' }
    ]
  }
});
```

**Response**
```typescript
{
  response: string;
  references?: Array<{
    title: string;
    url: string;
    source: 'legifrance' | 'inrs' | 'ameli';
  }>;
}
```

---

### legifrance-auth

Authentification à l'API Légifrance.

**Usage interne** : Appelé automatiquement par secubot-chat

---

### legifrance-sync

Synchronisation des textes réglementaires.

**Usage interne** : Tâche cron (quotidienne)

---

## Authentication

### Sign Up

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'SecureP@ssw0rd123',
  options: {
    data: {
      nom: 'Dupont',
      prenom: 'Jean'
    }
  }
});
```

### Sign In

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'SecureP@ssw0rd123'
});
```

### Sign Out

```typescript
const { error } = await supabase.auth.signOut();
```

### Get Session

```typescript
const { data: { session }, error } = await supabase.auth.getSession();
```

### Update User

```typescript
const { data, error } = await supabase.auth.updateUser({
  email: 'newemail@example.com',
  password: 'NewP@ssw0rd123'
});
```

---

## Error Handling

```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*');

if (error) {
  console.error('Database error:', error.message);
  // error.code, error.details, error.hint
}
```

**Codes d'erreur courants**
- `PGRST116` : Row not found
- `23505` : Unique violation
- `23503` : Foreign key violation
- `42501` : Insufficient privilege (RLS)

---

## Rate Limiting

Limites par défaut :
- Login : 5 tentatives / 15 min
- API calls : 100 requêtes / min
- File upload : 10 fichiers / heure

Géré via table `rate_limits` et edge functions.

---

## Realtime (optionnel)

```typescript
const channel = supabase
  .channel('notifications')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      console.log('New notification:', payload.new);
    }
  )
  .subscribe();

// Cleanup
channel.unsubscribe();
```

---

## Best Practices

1. **Toujours vérifier les erreurs**
```typescript
if (error) throw error;
```

2. **Utiliser React Query pour le cache**
```typescript
const { data } = useQuery({
  queryKey: ['projects', userId],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*');
    if (error) throw error;
    return data;
  }
});
```

3. **Optimistic updates**
```typescript
const mutation = useMutation({
  mutationFn: updateProject,
  onMutate: async (newData) => {
    await queryClient.cancelQueries(['project', id]);
    queryClient.setQueryData(['project', id], newData);
  }
});
```

4. **Pagination**
```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .range(0, 9) // 10 items
  .order('created_at', { ascending: false });
```

5. **Full-text search**
```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .textSearch('name', 'renovation');
```
