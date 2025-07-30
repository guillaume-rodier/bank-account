# 💰 Bank Account Application

## Description

This application allows you to manage a bank account with features such as:

- Deposits and withdrawals
- Setting or removing an authorized limit
- Applying interest

The project is structured as a **fullstack application** with:

- **Frontend**: Vue.js + Vuetify
- **Backend**: Node.js + Express + TypeScript

Everything is orchestrated from the root with unified commands using [`concurrently`](https://www.npmjs.com/package/concurrently).

---

## 🗂 Project Structure

```

bank-account/
│
├── back/                  # Node.js backend (TypeScript + express)
│   ├── controllers/       # Express controllers
│   ├── locales/           # Languages files
│   ├── routes/            # API route definitions
│   ├── services/          # Services files
│   ├── types/             # Types files
│   ├── utils/             # Utils files
│   ├── app.ts             # Main Express server
│   └── tsconfig.json      # Backend TypeScript config
│
├── front/                 # Vue.js + Vuetify frontend
│   ├── src/
│   │   ├── api/           # Api config
│   │   ├── assets/        # Styles and pictures
│   │   ├── components/    # Vue components
│   │   ├── plugins/       # Plugins configuration
│   │   ├── router/        # Vue Router
│   │   ├── stores/        # Pinia stores
│   │   ├── views/         # Page views
│   │   ├── App.vue        # Main file of the app
│   │   └── main.ts        # Main entry point
│   ├── public/            # Static files
│   ├── test/              # Test files
│   ├── .gitignore/        # Git ignored files
│   ├── jsconfig.js        # JS config
│   ├── vite.config.js/    # Vite config
│   ├── vitest.config.js   # Vitest config
│   └── package.json       # Frontend dependencies
│
├── package.json           # Root scripts (start/test/install)
└── .gitignore             # Git ignored files

````

---

## 🚀 Getting Started

From the root directory, install frontend and backend dependencies in parallel:

```bash
npm run install
````

This runs:

* `npm install` in `back/`
* `npm install` in `front/`

---

## 🔧 Running the App

To start both the backend and frontend simultaneously:

```bash
npm start
```

* Backend: [http://localhost:3000](http://localhost:3000)
* Frontend: [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## 📦 Available Commands

| Command           | Description                                     |
| ----------------- | ----------------------------------------------- |
| `npm run install` | Installs both frontend and backend dependencies |
| `npm start`       | Starts frontend and backend in parallel         |
| `npm test`        | Runs backend and frontend tests concurrently    |

> ⚠️ If you want to run frontend or backend independently, go into the respective folders and use their local scripts.

---

## ✅ Testing

* **Backend** tests use **Jest** (with TypeScript).
* **Frontend** tests use **Vitest**, **Vue Test Utils**, and **@testing-library/vue**.

From the root, run all tests with:

```bash
npm test
```

This executes:

* Backend tests from `back/`
* Frontend unit tests from `front/`

---

## 🧪 TypeScript Compilation

If you're modifying TypeScript settings or adding new backend files, you may want to manually compile the backend:

```bash
cd back
tsc
```

---

## 📝 Notes

* The backend exposes a REST API to manage account operations.
* The frontend uses Axios to consume the API and update UI state.
* Error handling and validations are implemented on both client and server sides.
* [`concurrently`](https://www.npmjs.com/package/concurrently) is used for simplified orchestration.

---

## 📫 Contact

For questions or suggestions, feel free to open an issue or contact the author.
