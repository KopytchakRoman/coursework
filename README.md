🌸 Perfumer

Full Stack веб-додаток (MERN) для пошуку та збереження парфумів з JWT-авторизацією.

🚀 Демо

Frontend: https://perfumer-z5th.vercel.app/

Backend: https://perfumer-api.onrender.com

🛠️ Стек

Core: MongoDB, Express.js, React 18, Node.js

Tools: Vite, Cypress (E2E/Component tests), JWT, bcryptjs

⚙️ Швидкий запуск

1. Бекенд

cd perfumer-backend
npm install

# Створіть .env: PORT=3001, MONGO_URI=..., JWT_SECRET=...

npm run data:import # Завантажити тестові дані
npm start

2. Фронтенд

cd perfumer
npm install

# Створіть .env: VITE_API_URL=http://localhost:3001

npm run dev

🧪 Тести

cd perfumer
npx cypress open
Автор:
Копитчак Роман Анатолійович
Група:
КН 3 курс 1 група
