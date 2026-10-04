# MediFlow

AI-ready full-stack clinic management platform.

## Tech Stack

Frontend:

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Lucide React

Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Nodemailer

## Development

Install dependencies from each application directory with `npm install`.

Frontend:

```powershell
cd frontend
npm run dev
```

Backend:

```powershell
cd backend
npm run dev
```

The API health check is available at `http://localhost:5000/api/health`.

## Environment Variables

Copy each `.env.example` to `.env` in its respective application directory and update values for your environment. `.env` files are ignored by Git.

Frontend (`frontend/.env`):

- `VITE_API_URL`: Base URL for the backend API, for example `http://localhost:5000/api`.

Backend (`backend/.env`):

- `PORT`: HTTP port for the API (defaults to `5000`).
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Private signing key; replace the placeholder with a unique, high-entropy value before use.
- `JWT_EXPIRES_IN`: JWT lifetime such as `7d` (defaults to `7d`).
- `CLIENT_URL`: Allowed frontend origin for CORS (defaults to `http://localhost:5173`).

## Authentication

The API provides `POST /api/auth/register` (patient accounts only), `POST /api/auth/login`, and authenticated `GET /api/auth/me`. Passwords are hashed with bcrypt, email addresses are normalized and unique, and all user responses omit password hashes. Access tokens are sent as bearer tokens; the frontend stores them in local storage for this development foundation.

Authentication requires a reachable MongoDB instance and configured `MONGODB_URI` and `JWT_SECRET`. Without MongoDB the API still starts for health checks, while authentication endpoints return `503`.

### Optional Development Admin

Admin accounts cannot be created through public registration. To seed one explicitly, configure `SEED_ADMIN_FIRST_NAME`, `SEED_ADMIN_LAST_NAME`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PHONE`, and `SEED_ADMIN_PASSWORD` in the environment, then run `npm run seed:admin` from `backend/`. The password must be at least 12 characters. The script does not run during server startup.

Role authorization is enforced by backend middleware. Patient, doctor, receptionist, and admin navigation is a convenience only; it is not a substitute for server-side checks.