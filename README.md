# 🔗 URL Shortener

This is a web application designed to instantly transform long, unwieldy URLs into clean, shareable aliases.
This project uses a ExpressJS - Vite - React architecture, utilizing FastAPI for a robust backend and React powered by Vite for a lightning-fast frontend. The entire ecosystem is containerized with Docker for seamless development and deployment.

## 🛠️ Tech Stack

*   **Backend:** ExpressJS
*   **Frontend:** React, Vite, Javascript
*   **Containerization:** Docker, Docker Compose


## 🏃 Getting Started

### 1. Clone the Repository
```bash

git clone https://github.com/mhng-fp/webApp_expressJS.git
```

### 2. To run without docker

*   **Backend API:** At server folder, `npm run dev`. Access `http://127.0.0.1:5000/hello`.
*   **Frontend (Vite + React):** At frontend folder, `npm run dev`. Access `http://127.0.0.1:5173`.


### 3. To run with docker

*   Ensure you have [Docker Desktop](https://docker.com) installed and docker engine running.
*   At root folder, `docker build --no-cache -f server/Dockerfile -t express-backend:1.0 ./server`
*   At root folder, `docker run -d -p 5000:5000 --name running-backend express-backend:1.0`. Access `http://127.0.0.1:5000/hello`.
*   At root folder, `docker build -f frontend/Dockerfile -t my-react-app:1.0 ./frontend`
*   At root folder, `docker run -d -p 5173:5173 --name running-frontend my-react-app:1.0`. Access `http://127.0.0.1:5173`.


### 4. To run with docker compose

*   Ensure you have [Docker Desktop](https://docker.com) installed and docker engine running.
*   At root folder, `docker compose up --build -d`. Access `http://127.0.0.1:5000/hello` and `http://127.0.0.1:5173`.

---


```

---
