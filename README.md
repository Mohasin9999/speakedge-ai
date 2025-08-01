# SpeakEdge - AI-Powered Language Learning Platform
<h1 align="center">
 <img src="https://github.com/Mohasin9999/speakedge-ai/blob/main/frontend/src/assets/speakedge_logo_white.png">
</h1>
SpeakEdge is a modern, AI-driven web application designed to help users improve their English speaking and conversational skills. It provides a suite of tools including real-time feedback, interactive chat scenarios, and progress tracking to make language learning engaging and effective.

## ✨ Features

-   **Full User Authentication**: Secure login, registration, and password recovery flows.
-   **Responsive Design & Dark Mode**: A beautiful, modern UI that works seamlessly on all devices and supports both light and dark themes.
-   **Interactive User Dashboard**: A central hub for users to view their stats, achievements, and recent activity.
-   **AI Chat Practice**: Engage in realistic chat scenarios with an AI to practice conversational skills in various contexts.
-   **AI Speaking Practice**: Record your voice on given topics, get a cool audio visualizer, and submit your speech for AI-powered analysis.
-   **Comprehensive Achievement System**: Over 30 achievements with progress bars to motivate and reward users for their milestones.
-   **User Settings**: A dedicated page for users to manage their profile information, change passwords, and update preferences.

---

## 🛠️ Technology Stack

This project is built with a modern MERN stack, leveraging powerful AI models for its core functionality.

#### **Core Stack**

-   **Frontend**: React, Tailwind CSS, React Router
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB

#### **AI & Machine Learning**

-   **Core Models**: Google Gemini, OpenAI (ChatGPT, Whisper), Meta (Llama,wev2vec2)
-   **Platform**: Hugging Face for model access and integration.
-   **Backend Language**: Python is used for the AI/ML microservices.

---

## 📁 File Structure

The project is organized into a monorepo structure with a separate `frontend` and `server` directory.

```bash
speakedge/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── dashboard/
│       ├── layouts/
│       └── pages/
├── server/
│   ├── controllers/
│   ├── models/
│   └── routes/
│   └── server.js
└── package.json
```

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   MongoDB (local instance or a cloud service like MongoDB Atlas)
-   Python (for AI services)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mohasin9999/speakedge-ai
    cd speakedge-ai
    ```

2.  **Install root dependencies:**
    This project uses `concurrently` to run both the frontend and backend servers with a single command.
    ```bash
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

4.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```

5.  **Set up Environment Variables:**
    Create a `.env` file in the `server` directory and add the necessary environment variables.
    ```env
    # /server/.env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5001
    ```

### Running the Project

This project is configured to run both the frontend and backend servers concurrently. From the **root directory** of the project, run one of the following commands:

-   **For development (recommended):**
    This command will start both the React development server and the Node.js server.
    ```bash
    npm run dev
    ```

-   **For production builds:**
    This command assumes you have already built the frontend.
    ```bash
    npm start
    ```

Your application should now be running, with the frontend available at `http://localhost:3000` and the server at `http://localhost:5001`.

### Scripts Explained

The `package.json` in the root directory contains the following scripts:

-   `"start": "concurrently \"cd frontend && npm start\" \"cd server && npm start\""`: Runs the start scripts for both frontend and server.
-   `"dev": "concurrently \"npm run start --prefix frontend\" \"npm run start --prefix server\""`: A more explicit way to run the development servers in their respective directories.
