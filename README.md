# ChatDB - Chat with Database

**ChatDB** is an AI-powered chat application that translates natural language database queries into precise data outputs. This project consists of a **Next.js frontend** and a **Django DRF backend**, connected through a CI/CD pipeline using Docker Compose. The goal of ChatDB is to simplify database querying for users by enabling them to ask queries in natural language and receive accurate, relevant data.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation and Setup](#installation-and-setup)
6. [Usage](#usage)
7. [Environment Variables](#environment-variables)
8. [Docker Integration](#docker-integration)
9. [Technologies Used](#technologies-used)
10. [Contributing](#contributing)
11. [License](#license)

## Project Overview
ChatDB simplifies interactions with databases by translating natural language queries (NLQ) into structured database queries and returning the appropriate data. The system supports multiple databases such as **MySQL**, **SQLite**, and **MongoDB**. The frontend is built using **Next.js**, providing an intuitive interface, while the backend is powered by **Django** and **Django REST Framework (DRF)** to handle requests and communicate with the database.

## Features
- **Natural Language Queries:** Users can ask questions in plain language to query the database.
- **Database Agnostic:** Supports different databases like MySQL, SQLite, and MongoDB.
- **Real-time Responses:** The application processes queries and returns data instantly.
- **Scalable Architecture:** With Docker and Docker Compose, the system can be scaled and deployed efficiently.
- **NLP Integration:** Uses NLP techniques for accurate query translation.
- **Full-stack Solution:** Combines a responsive frontend and powerful backend to deliver seamless user experiences.

## Project Structure
```
/ChatDB
├── /frontend  # Next.js-based frontend
├── /backend   # Django DRF-based backend
├── compose.yaml   # Docker Compose file for setting up the project
└── README.md      # Project documentation
```

## Prerequisites
Before setting up and running the project, ensure that you have the following installed:
- **Node.js** (v14.x or higher)
- **Python** (v3.8 or higher)
- **Docker** (v20.x or higher)
- **Docker Compose** (v1.29 or higher)

## Installation and Setup

You can set up ChatDB in **two ways**:

### 1. Running Frontend & Backend Separately

**Frontend Setup:**

1. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Run the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will be accessible at `http://localhost:3000`.

**Backend Setup:**

1. Navigate to the backend directory and create a virtual environment:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Django server:
   ```bash
   python manage.py runserver
   ```

   The backend will be accessible at `http://localhost:8000`.

### 2. Running the Project with Docker Compose

1. From the root directory (`/ChatDB`), run the following command to start both the frontend and backend using Docker:
   ```bash
   docker-compose up --build
   ```

   The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8000`.

2. To stop the containers:
   ```bash
   docker-compose down
   ```

3. To rebuild and restart the containers:
   ```bash
   docker-compose up --build
   ```

## Usage
1. **Access the Frontend:**
   Open your browser and go to `http://localhost:3000`. You can interact with the app by typing natural language queries into the chat interface.

2. **Access the Backend API:**
   The API handles queries and processes the natural language inputs. For detailed information about API endpoints and their usage, refer to the `README.md` located in the [backend folder](./backend/README.md).

## Environment Variables
You can configure your environment variables in a `.env` file within the root directory. Below are some common variables you might need to set:

**Frontend:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

**Backend:**
```env
DB_HOST=db
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
```

## Docker Integration
The project is fully Dockerized for ease of deployment. The `compose.yaml` file includes services for both the frontend and backend. To spin up the project, run:

```bash
docker-compose up --build
```

To stop the containers:

```bash
docker-compose down
```

To rebuild and restart the containers:

```bash
docker-compose up --build
```

## Technologies Used
- **Frontend:**
  - Next.js
  - JavaScript
  - Mantine (UI Framework)
  
- **Backend:**
  - Django
  - Django REST Framework (DRF)
  - MySQL, MongoDB, SQLite (Database options)
  
- **Other:**
  - Docker & Docker Compose
  - Natural Language Processing (NLP)
  - TensorFlow (for AI processing)

## Contributing
We welcome contributions! Please fork the repository and submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Added feature X"`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.