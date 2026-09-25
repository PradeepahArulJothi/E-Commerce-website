# Local Setup and Deployment

## Backend
```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```
Set MONGODB_URI and JWT_SECRET in `.env`.

## Frontend
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```
Set `VITE_API_URL=http://localhost:5000/api`.

## Production
Deploy backend as a Node service on Render. Build command: `npm install`; start command: `npm start`; root directory: `backend`. Add PORT, MONGODB_URI, JWT_SECRET and CLIENT_URL.
Deploy frontend on Vercel. Root directory: `frontend`; build command: `npm run build`; output directory: `dist`; environment variable `VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api`.

## Security
Never commit `.env`. Rotate any credentials accidentally exposed in Git or chat. Use a strong JWT secret and restrict MongoDB network access.

generate jwt token
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

api health point
http://localhost:5000/api/health

copy .env
Copy-Item .env.example .env