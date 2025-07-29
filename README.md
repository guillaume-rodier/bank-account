# Bank Account Application

## Description

Cette application permet la gestion d’un compte bancaire avec fonctionnalités telles que dépôt, retrait, définition d’un plafond, et application d’intérêts.
Le projet est organisé en architecture fullstack avec :

* **Frontend** en Vue.js + Vuetify
* **Backend** en Node.js + Express + TypeScript

Lancement simplifié via une commande unique qui démarre frontend et backend en parallèle.

---

## Structure du projet

```
bank-account/
│
├── backend/              # Backend Node.js (TypeScript)
│   ├── controllers/      # Contrôleurs Express
│   ├── routes/           # Définition des routes API
│   ├── models/           # Modèles de données (si besoin)
│   ├── server.ts         # Serveur Express principal
│   └── tsconfig.json     # Configuration TypeScript backend
│
├── frontend/             # Frontend Vue.js + Vuetify
│   ├── src/
│   │   ├── components/   # Composants Vue
│   │   ├── views/        # Pages/Vues
│   │   ├── router/       # Gestion des routes Vue
│   │   └── main.ts       # Entrée principale Vue
│   ├── public/           # Fichiers statiques
│   └── package.json      # Dépendances frontend
│
├── package.json          # Scripts communs, dépendances dev (concurrently, etc.)
├── tsconfig.json         # Configuration TS commune (optionnelle)
└── .gitignore            # Fichiers à ignorer par git
```

---

## Installation

À la racine du projet, lance la commande pour installer les dépendances du frontend et du backend simultanément :

```bash
npm run install
```

Cette commande utilise [`concurrently`](https://www.npmjs.com/package/concurrently) pour exécuter :

* `npm install` dans le dossier `backend`
* `npm install` dans le dossier `frontend`

---

## Lancement de l’application

Toujours depuis la racine, lance la commande suivante pour démarrer backend et frontend en parallèle :

```bash
npm start
```

* Le backend sera accessible sur `http://localhost:3000`
* Le frontend sur `http://localhost:5173` (port par défaut Vite)

---

## Commandes utiles

| Commande                 | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `npm run install`        | Installe les dépendances frontend et backend            |
| `npm start`              | Démarre frontend et backend simultanément               |
| `npm run backend`        | Démarre uniquement le backend                           |
| `npm run frontend`       | Démarre uniquement le frontend                          |
| `npm test`               | Lance les tests backend (à adapter selon configuration) |
| `npm run build-frontend` | Compile le frontend Vue.js pour la production           |
| `npm run build-backend`  | Compile le backend TypeScript (si script ajouté)        |

---

## Tests

* Les tests backend sont écrits en **Jest** avec TypeScript.
* Les tests frontend utilisent **Vue Test Utils** et **Jest** (à configurer).

Pour lancer tous les tests backend :

```bash
npm run test-backend
```

---

## Mise à jour TypeScript

Si tu modifies la configuration TS ou ajoutes des fichiers, pense à recompiler le backend (si nécessaire) :

```bash
cd backend
tsc
```

---

## Remarques

* Le backend expose une API REST pour gérer les opérations bancaires.
* Le frontend consomme cette API via Axios (ou fetch) pour afficher et modifier les données du compte.
* La gestion des erreurs et validations sont faites côté backend et frontend.
* Le projet utilise **concurrently** pour faciliter la gestion des deux serveurs.

---

## Contact

Pour toute question ou amélioration, n’hésite pas à ouvrir une issue ou contacter l’auteur.
