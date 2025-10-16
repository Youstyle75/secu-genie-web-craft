# Tests E2E avec Playwright

## Installation

```bash
npm install
npx playwright install
```

## Exécution des tests

### Tous les tests
```bash
npm run test:e2e
```

### Tests en mode visuel
```bash
npm run test:e2e:headed
```

### Mode debug
```bash
npm run test:e2e:debug
```

### Tests spécifiques
```bash
npm run test:e2e -- auth.spec.ts
npm run test:e2e -- --grep "should login"
```

## Couverture des tests

- ✅ **Authentification complète** (e2e/auth.spec.ts)
- ✅ **Workflow projet complet** (e2e/project-workflow.spec.ts)
- ✅ **Collaboration temps réel** (e2e/collaboration.spec.ts)
- ✅ **Accessibilité AAA** (e2e/accessibility.spec.ts)
- ✅ **Performance & Web Vitals** (e2e/performance.spec.ts)
- ✅ **Smoke tests** (e2e/smoke.spec.ts)

## Rapports

Les rapports HTML sont générés dans `playwright-report/`
```bash
npx playwright show-report
```

## CI/CD

Les tests sont configurés pour s'exécuter automatiquement dans votre pipeline CI/CD.
