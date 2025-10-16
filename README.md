# SecuGenie

**SecuGenie** est une plateforme SaaS complète pour la gestion de la sécurité sur les chantiers, conforme aux normes françaises et européennes.

## 🚀 Fonctionnalités principales

- **Gestion de projets** : Création et suivi de chantiers
- **Documents réglementaires** : PPSPS, Plan de prévention, Notices de sécurité (GN6)
- **Éditeur de plans** : Création de plans de prévention interactifs
- **Assistant IA** : Génération automatique de documents et conseils réglementaires
- **Chatbot réglementaire** : Réponses en temps réel sur la législation du travail
- **Collaboration** : Commentaires, notifications et partage de documents
- **Sécurité renforcée** : 2FA, chiffrement, audit trail, conformité RGPD

## 📋 Prérequis

- Node.js 18+ 
- npm ou bun
- Compte Lovable Cloud (backend automatique)

## 🛠️ Installation locale

```bash
# Cloner le projet
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:8080`

## 🔐 Variables d'environnement

Les variables suivantes sont automatiquement configurées via Lovable Cloud :

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-id>
```

Pour les edge functions, des secrets supplémentaires sont disponibles :
- `LOVABLE_API_KEY` : Pour l'IA intégrée
- `SUPABASE_SERVICE_ROLE_KEY` : Pour les opérations admin côté serveur

## 📦 Scripts disponibles

```bash
# Développement
npm run dev              # Lance le serveur de développement

# Build
npm run build           # Compile pour production
npm run preview         # Prévisualise le build production

# Tests
npm run test            # Lance les tests unitaires
npm run test:coverage   # Lance les tests avec coverage
npm run test:ui         # Interface graphique pour les tests

# Qualité de code (à ajouter dans package.json)
npm run lint            # Vérifie le code avec ESLint
npm run type-check      # Vérifie les types TypeScript
```

## 🏗️ Architecture du projet

```
src/
├── components/          # Composants React réutilisables
│   ├── ai/             # Composants IA (assistant, générateur)
│   ├── auth/           # Authentification et protection
│   ├── chatbot/        # Chatbot réglementaire SecuBot
│   ├── collaboration/  # Commentaires et notifications
│   ├── documents/      # Gestion et édition de documents
│   ├── editor/         # Éditeur de plans interactif
│   ├── home/           # Sections de la page d'accueil
│   ├── layout/         # Header, Footer, Layout
│   ├── security/       # 2FA, RGPD, sécurité
│   └── ui/             # Composants UI (shadcn/ui)
├── contexts/           # Contextes React (Auth, etc.)
├── hooks/              # Custom hooks réutilisables
├── integrations/       # Intégrations externes (Supabase)
├── lib/                # Utilitaires et helpers
│   └── security/       # Encryption, validation, audit, TOTP
├── pages/              # Pages de l'application
├── services/           # Services métier (PDF, documents)
├── types/              # Types TypeScript
└── main.tsx            # Point d'entrée

supabase/
├── functions/          # Edge Functions serverless
│   ├── ai-assistant/   # Assistant IA
│   ├── legifrance-auth/# Auth Légifrance API
│   ├── legifrance-sync/# Sync réglementaire
│   └── secubot-chat/   # Chatbot réglementaire
└── migrations/         # Migrations de base de données
```

## 🎨 Stack technique

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build ultra-rapide
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI
- **React Router** pour la navigation
- **TanStack Query** pour la gestion d'état serveur
- **React Hook Form** + **Zod** pour les formulaires

### Backend (Lovable Cloud)
- **Supabase** pour la base de données PostgreSQL
- **Row Level Security** pour la sécurité des données
- **Supabase Auth** pour l'authentification
- **Supabase Storage** pour les fichiers
- **Edge Functions** pour la logique serveur

### Sécurité
- Chiffrement côté client (Web Crypto API)
- 2FA avec TOTP (QR codes)
- Audit trail complet
- Rate limiting
- Conformité RGPD
- Headers de sécurité

### IA
- **Lovable AI** pour l'assistant et la génération de documents
- Modèles supportés : GPT-5, Gemini 2.5 Pro/Flash
- Pas de clé API requise

## 🧪 Tests

Le projet utilise **Vitest** et **Testing Library** pour les tests :

```bash
npm run test              # Lance tous les tests
npm run test:coverage     # Génère le rapport de couverture
npm run test:ui           # Interface interactive
```

Couverture actuelle :
- Composants UI : 85%+
- Hooks personnalisés : 90%+
- Pages principales : 80%+

## 🚢 Déploiement

### Via Lovable (recommandé)
1. Cliquer sur le bouton **Publish** dans l'éditeur Lovable
2. L'application est automatiquement déployée sur `*.lovable.app`
3. Configurer un domaine personnalisé dans les paramètres du projet

### Via Infomaniak
Voir la documentation complète dans [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de code
- Utiliser TypeScript strict
- Suivre les conventions de nommage React
- Écrire des tests pour les nouvelles fonctionnalités
- Documenter avec JSDoc les fonctions complexes
- Respecter les règles ESLint

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) - Détails techniques de l'architecture
- [API](docs/API.md) - Documentation complète de l'API
- [Déploiement](docs/DEPLOYMENT.md) - Guide de déploiement
- [Guide utilisateur](docs/user-guide.md) - Manuel d'utilisation

## 📄 Licence

Ce projet est propriétaire et confidentiel.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe via le formulaire de contact sur le site
- Consulter la [documentation Lovable](https://docs.lovable.dev)

## 🔄 CI/CD

Le projet utilise GitHub Actions pour l'intégration continue :
- Lint et vérification de types
- Tests unitaires automatiques
- Build de validation
- Déploiement automatique sur la branche main

Voir `.github/workflows/ci-cd.yml` pour les détails.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (via Lovable Cloud)

## Project info

**URL**: https://lovable.dev/projects/0948e699-a6a1-4bb8-9427-72d1d96510d1
