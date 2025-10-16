# Guide de déploiement SecuGenie

## Overview

Ce guide couvre le déploiement de SecuGenie sur différentes plateformes, avec un focus sur Infomaniak pour l'hébergement production.

## Table des matières

1. [Déploiement via Lovable](#déploiement-via-lovable)
2. [Déploiement sur Infomaniak](#déploiement-sur-infomaniak)
3. [Configuration DNS](#configuration-dns)
4. [SSL/HTTPS](#sslhttps)
5. [Variables d'environnement](#variables-denvironnement)
6. [Monitoring](#monitoring)
7. [Rollback](#rollback)
8. [Checklist pré-déploiement](#checklist-pré-déploiement)

---

## Déploiement via Lovable

### Méthode la plus simple (recommandée pour staging)

1. **Ouvrir Lovable Editor**
   - Accéder à https://lovable.dev/projects/0948e699-a6a1-4bb8-9427-72d1d96510d1

2. **Cliquer sur "Publish"**
   - En haut à droite de l'interface
   - L'application est automatiquement déployée

3. **URL de déploiement**
   - Format : `https://<project-name>.lovable.app`
   - Accessible immédiatement

4. **Domaine personnalisé** (optionnel)
   - Aller dans Project > Settings > Domains
   - Cliquer sur "Connect Domain"
   - Suivre les instructions pour configurer le DNS
   - Nécessite un plan payant Lovable

### Avantages
- Déploiement en un clic
- SSL automatique
- CDN global intégré
- Rollback facile via l'historique
- Zero downtime

### Limites
- Contrôle limité sur l'infrastructure
- Dépendance à la plateforme Lovable

---

## Déploiement sur Infomaniak

### Prérequis

- Compte Infomaniak avec hébergement web
- Accès FTP ou SSH
- Node.js installé (si build local)
- Accès au panneau de contrôle Infomaniak

### Étape 1 : Build de production

**Local**
```bash
# Cloner le repo
git clone <repository-url>
cd secugenie

# Installer les dépendances
npm install

# Build de production
npm run build

# Le dossier dist/ contient les fichiers à déployer
```

**Via GitHub Actions** (automatique)
```yaml
# Déjà configuré dans .github/workflows/ci-cd.yml
# Le build est créé automatiquement sur push main
```

### Étape 2 : Configuration Infomaniak

**Via cPanel**

1. Se connecter au cPanel Infomaniak
2. Aller dans "Gestionnaire de fichiers"
3. Naviguer vers `public_html/` ou le dossier de votre domaine
4. Supprimer les fichiers existants (backup avant!)
5. Uploader le contenu de `dist/`

**Via FTP**

```bash
# Connexion FTP
ftp ftp.votredomaine.com
# Entrer identifiants

# Upload des fichiers
cd public_html
mput dist/*
```

**Via SSH (recommandé)**

```bash
# Connexion SSH
ssh user@votredomaine.com

# Cloner le repo
git clone <repository-url> /path/to/secugenie
cd /path/to/secugenie

# Installer et builder
npm install
npm run build

# Copier vers public_html
cp -r dist/* /var/www/html/
```

### Étape 3 : Configuration .htaccess

Créer un fichier `.htaccess` dans `public_html/` :

```apache
# Activer la réécriture d'URL
RewriteEngine On

# Rediriger HTTP vers HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Support React Router (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Compression gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

### Étape 4 : Variables d'environnement

Infomaniak ne supporte pas directement les variables d'environnement pour sites statiques. Solutions :

**Option A : Variables build-time** (recommandée)
```bash
# Build avec les variables
VITE_SUPABASE_URL=https://oejwidbngxxelnivzcxs.supabase.co \
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc... \
npm run build
```

**Option B : Fichier .env.production**
```env
# .env.production
VITE_SUPABASE_URL=https://oejwidbngxxelnivzcxs.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
VITE_SUPABASE_PROJECT_ID=oejwidbngxxelnivzcxs
```

**ATTENTION** : Ne jamais commiter `.env.production` avec des secrets!

### Étape 5 : Déploiement automatisé (optionnel)

**Script de déploiement**

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Déploiement SecuGenie sur Infomaniak"

# 1. Pull latest changes
git pull origin main

# 2. Install dependencies
npm ci

# 3. Build
npm run build

# 4. Upload via FTP (lftp requis)
lftp -u $FTP_USER,$FTP_PASSWORD ftp.votredomaine.com <<EOF
mirror -R dist/ public_html/
bye
EOF

echo "✅ Déploiement terminé!"
```

**GitHub Actions (CI/CD)**

Mettre à jour `.github/workflows/ci-cd.yml` :

```yaml
deploy:
  needs: test
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    
    - name: Install and Build
      run: |
        npm ci
        npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
    
    - name: Deploy via FTP
      uses: SamKirkland/FTP-Deploy-Action@4.3.0
      with:
        server: ftp.votredomaine.com
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/
        server-dir: /public_html/
```

**Configurer les secrets GitHub** :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `FTP_USERNAME`
- `FTP_PASSWORD`

---

## Configuration DNS

### Pour domaine personnalisé sur Infomaniak

1. **Accéder au panneau DNS**
   - Manager Infomaniak > Domaines > Gérer la zone DNS

2. **Enregistrements A**
   ```
   Type: A
   Nom: @
   Valeur: <IP-serveur-infomaniak>
   TTL: 3600
   ```

3. **Enregistrement CNAME (www)**
   ```
   Type: CNAME
   Nom: www
   Valeur: votredomaine.com
   TTL: 3600
   ```

4. **Propagation DNS**
   - Attendre 1-24h pour propagation complète
   - Vérifier : `dig votredomaine.com`

---

## SSL/HTTPS

### Infomaniak

**Let's Encrypt (gratuit)**
1. Manager Infomaniak > Sites web > Certificats SSL
2. Activer "Let's Encrypt"
3. Renouvellement automatique tous les 90 jours

**Forcer HTTPS**
- Déjà configuré dans `.htaccess` ci-dessus

### Lovable
- SSL automatique via Let's Encrypt
- Aucune configuration requise

---

## Variables d'environnement

### Production

```env
VITE_SUPABASE_URL=https://oejwidbngxxelnivzcxs.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=oejwidbngxxelnivzcxs
```

### Staging

```env
# Mêmes valeurs (même projet Supabase pour dev/prod)
```

**IMPORTANT** : 
- Ces clés sont publiques (anon key)
- RLS protège les données
- Pas de secrets côté client

---

## Monitoring

### Uptime monitoring

**UptimeRobot** (gratuit)
1. Créer un compte sur uptimerobot.com
2. Ajouter un monitor HTTP(s)
3. URL : https://votredomaine.com
4. Intervalle : 5 minutes
5. Alertes : Email/SMS

### Performance monitoring

**Google Analytics**
```html
<!-- Dans index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Supabase Dashboard**
- Métriques base de données
- Edge function logs
- Auth metrics
- Accès : https://supabase.com/dashboard/project/oejwidbngxxelnivzcxs

### Error tracking

**Sentry** (optionnel)
```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://...@sentry.io/...",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

---

## Rollback

### Via Lovable
1. Ouvrir l'éditeur Lovable
2. Cliquer sur History (icône horloge)
3. Sélectionner version précédente
4. Cliquer "Restore"
5. Re-publier

### Via GitHub + Infomaniak

```bash
# 1. Identifier le commit à restaurer
git log --oneline

# 2. Revert ou reset
git revert <commit-hash>
# ou
git reset --hard <commit-hash>

# 3. Push
git push origin main --force

# 4. Redéployer
./deploy.sh
```

### Backup manuel

```bash
# Avant chaque déploiement
ssh user@votredomaine.com
cd /var/www/html
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz *
mv backup-*.tar.gz ~/backups/
```

---

## Checklist pré-déploiement

### Code

- [ ] Tous les tests passent (`npm run test`)
- [ ] Pas d'erreurs TypeScript (`npm run type-check`)
- [ ] Pas d'erreurs ESLint (`npm run lint`)
- [ ] Build réussit (`npm run build`)
- [ ] Pas de console.log en production

### Sécurité

- [ ] Variables d'environnement configurées
- [ ] Pas de secrets dans le code
- [ ] HTTPS forcé
- [ ] Headers de sécurité configurés
- [ ] RLS activée sur toutes les tables

### Performance

- [ ] Images optimisées
- [ ] Code splitting activé
- [ ] Lazy loading des routes
- [ ] Cache headers configurés
- [ ] Compression gzip activée

### SEO

- [ ] Meta tags configurés
- [ ] Sitemap.xml généré
- [ ] robots.txt configuré
- [ ] URLs propres (pas de #)
- [ ] Schema.org markup

### Monitoring

- [ ] Uptime monitoring configuré
- [ ] Analytics installé
- [ ] Error tracking configuré
- [ ] Logs accessibles

### Documentation

- [ ] README à jour
- [ ] CHANGELOG mis à jour
- [ ] Version taggée dans Git
- [ ] Équipe notifiée

---

## Troubleshooting

### Erreur 404 sur refresh
➡️ Vérifier configuration `.htaccess` pour React Router

### Assets ne chargent pas
➡️ Vérifier chemins relatifs dans `index.html`
➡️ Base URL dans `vite.config.ts`

### Variables d'environnement undefined
➡️ Préfixer avec `VITE_`
➡️ Rebuilder après changement

### Erreur Supabase
➡️ Vérifier CORS dans Supabase dashboard
➡️ Vérifier URL de redirection auth

### Performance lente
➡️ Activer compression
➡️ Vérifier CDN
➡️ Optimiser images

---

## Support

- Documentation Lovable : https://docs.lovable.dev
- Support Infomaniak : https://www.infomaniak.com/support
- Supabase Docs : https://supabase.com/docs
