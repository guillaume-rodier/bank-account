# 🧠 All My API

Une API Express simple avec Prisma, JWT, et TypeScript, permettant la gestion d'utilisateurs, d'amis et d'images.

## 📁 Structure du projet

```

all-my-api/
├── prisma/
│   ├── schema.prisma         # Schéma de la base de données
│   └── migrations/           # Dossier des migrations Prisma
├── src/
│   ├── controllers/          # Contrôleurs Express (user, image, etc.)
│   ├── middlewares/          # Middlewares personnalisés (auth, erreurs)
│   ├── routes/               # Fichiers de routes Express
│   ├── types/                # Types personnalisés (ex: AuthenticatedRequest)
│   ├── app.ts                # Entrée principale de l'application
├── .env                      # Variables d’environnement (JWT\_SECRET, DB\_URL, etc.)
├── package.json
├── tsconfig.json
└── README.md

```

---

## ⚙️ Technologies utilisées

- **Express.js** – Framework HTTP rapide et minimaliste
- **Prisma** – ORM moderne pour TypeScript et Node.js
- **TypeScript** – Typage statique puissant
- **JWT** – Authentification sécurisée via token
- **bcryptjs** – Hachage des mots de passe
- **dotenv** – Chargement des variables d’environnement

---

## 🧪 Prérequis

- Node.js v18 ou plus recommandé
- Une base de données MySQL ou PostgreSQL (ou SQLite pour test rapide)

---

## 🚀 Installation & démarrage

1. **Cloner le projet**

```bash
git clone https://github.com/tonutilisateur/all-my-api.git
cd all-my-api
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer l’environnement**

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="file:./dev.db"   # ou PostgreSQL : "postgresql://..."
JWT_SECRET="supersecret"
PORT=3000
```

4. **Initialiser Prisma et la base**

```bash
npx prisma generate        # Génère le client Prisma
npx prisma migrate dev     # Applique les migrations (dev)
npx prisma studio          # Interface web pour explorer les données
```

---

## 🧩 Scripts utiles

| Commande                 | Description                            |
| ------------------------ | -------------------------------------- |
| `npm run dev`            | Lance le serveur en mode développement |
| `npm run build`          | Compile le code TypeScript             |
| `npm start`              | Lance le serveur compilé (`dist/`)     |
| `npx prisma studio`      | Ouvre Prisma Studio (UI DB)            |
| `npx prisma migrate dev` | Crée une migration et initialise la DB |
| `npx prisma db seed`     | Insère des données de test en BD       |

---

## 📚 Routes disponibles

## 🔐 Authentification (JWT)

| Méthode | URL                       | Description                                           | Authentification |
| ------- | ------------------------- | ----------------------------------------------------- | ---------------- |
| POST    | `/api/auth/register`      | Enregistre un nouvel utilisateur                      | ❌                |
| POST    | `/api/auth/login`         | Connecte l’utilisateur et retourne 2 tokens JWT       | ❌                |
| POST    | `/api/auth/refresh-token` | Génère un nouveau `accessToken` via un `refreshToken` | ✅ (dans body)    |
| GET     | `/api/auth/check-token`   | Vérifie la validité du `accessToken`                  | ✅                |

### 🔑 Détail des tokens

* **accessToken**

  * Durée : 15 min
  * à mettre dans `Authorization > Bearer Token`

* **refreshToken**

  * Durée : 7 jours
  * à envoyer dans le body JSON

### Exemple Body pour `refresh-token`

```json
{
  "refreshToken": "{{refreshToken}}"
}
```

### Exemple de réponse `login`

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

## 👤 Utilisateurs

| Méthode | URL              | Description                    | Authentification |
| ------- | ---------------- | ------------------------------ | ---------------- |
| GET     | `/api/users`     | Liste tous les utilisateurs    | ✅                |
| GET     | `/api/users/:id` | Récupère un utilisateur par ID | ✅                |
| PUT     | `/api/users/:id` | Met à jour un utilisateur      | ✅                |
| DELETE  | `/api/users/:id` | Supprime un utilisateur        | ✅                |

---

## 🧑‍🤝‍🧑 Amis (Friendship)

| Méthode | URL                                                 | Description                                     |
| ------- | --------------------------------------------------- | ----------------------------------------------- |
| GET     | `/api/friendship/:id/friends`                       | Liste des amis validés                          |
| POST    | `/api/friendship/:id/friends`                       | Envoie une demande d'ami                        |
| GET     | `/api/friendship/:id/friends/requests`              | Liste des demandes en attente (reçues)          |
| GET     | `/api/friendship/:id/friends/status/:targetId`      | Status d'une demande en attente en ami (reçues) |
| PUT     | `/api/friendship/:id/friends/accept/:targetId`      | Accepte une demande d'ami                       |
| PUT     | `/api/friendship/:id/friends/decline/:targetId`     | Décline une demande d'ami                       |
| DELETE  | `/api/friendship/:id/friends/delete/:targetId`             | Supprime une amitié                             |

> Le modèle Friendship inclut :
>
> * `requesterId` (celui qui fait la demande)
> * `recipientId` (celui qui reçoit)
> * `status` : `PENDING`, `ACCEPTED`, `DECLINED`

---

### 🖼️ Images (routes à développer)

| Méthode | URL               | Description                   | Authentification |
| ------- | ----------------- | ----------------------------- | ---------------- |
| GET     | `/api/images`     | Liste des images              | ✅                |
| POST    | `/api/images`     | Upload une image (ou données) | ✅                |
| DELETE  | `/api/images/:id` | Supprime une image            | ✅                |

---

## 🧱 Exemple de schéma Prisma

```prisma
model User {
  id        Int        @id @default(autoincrement())
  email     String     @unique
  password  String
  role      Role       @default(USER)
  friendships Friendship[] @relation("UserFriends")
}

model Friendship {
  id        Int     @id @default(autoincrement())
  userId    Int
  friendId  Int
  user      User    @relation("UserFriends", fields: [userId], references: [id])
  friend    User    @relation("FriendOf", fields: [friendId], references: [id])
}

enum Role {
  ROOT
  ADMIN
  USER
  GUEST
}
```

## 🧪 Tests Postman

### Utiliser les environnements

* Créez un **Environnement** avec :

  * `accessToken`
  * `refreshToken`

### Onglet **Tests** dans Postman (pour stocker automatiquement)

```js
const json = pm.response.json();
if (json.accessToken) {
  pm.environment.set("accessToken", json.accessToken);
}
if (json.refreshToken) {
  pm.environment.set("refreshToken", json.refreshToken);
}
```

---

## 🧹 À faire

* 🔲 Valider les champs avec `zod` ou `joi`
* 🔲 Ajout d’un rate limiter
* 🔲 Upload & gestion des images
* 🔲 Tests unitaires avec Jest

---

## 🧑‍💻 Auteurs

* **Guillaume** – Développeur principal

---

## 📜 Licence

Ce projet est sous licence MIT.
