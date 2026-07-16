<div align="center">

# 🤖 AI Learning Assistant

### An AI-powered MERN application that helps students learn smarter through document analysis, AI-generated summaries, flashcards, quizzes, and interactive chat.

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react"/>
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js"/>
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb"/>
<img src="https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google"/>

</div>

---

# 📖 Overview

AI Learning Assistant is a full-stack MERN application designed to simplify studying by using Artificial Intelligence.

Students can upload their study documents, generate AI-powered summaries, chat with documents, create flashcards, take quizzes, organize notes, and monitor learning progress—all from one platform.

---

# ✨ Features

## 👤 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Profile Management
- Change Password

---

## 📄 Document Management

- Upload PDF Documents
- Store Documents Securely
- View Uploaded Documents
- Delete Documents
- Document Metadata
- Organized Dashboard

---

## 🤖 AI Features

Powered by **Google Gemini AI**

- AI Document Summary
- Chat with PDF
- Explain Concepts
- Generate Flashcards
- Generate Quiz Questions
- Smart AI Responses

---

## 📚 Flashcards

- AI Generated Flashcards
- Flip Animation
- Review Anytime
- Learning Friendly UI

---

## 📝 Quiz Module

- AI Generated MCQs
- Instant Result
- Score Tracking
- Performance Feedback

---

## 📊 Dashboard

- Learning Statistics
- Uploaded Documents
- Flashcards Count
- Quiz Progress
- Recent Activity

---

## 👨‍💻 User Experience

- Responsive Design
- Clean Dashboard
- Modern UI
- Toast Notifications
- Loading States
- Error Handling

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Express Validator

---

## AI

- Google Gemini API

---

## Development Tools

- Vite
- Postman
- Git
- GitHub

---

# 📂 Project Structure

```
AI-Learning-Assistant/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   └── ai-learning-assistant/
│       ├── public/
│       ├── src/
│       ├── package.json
│       ├── package-lock.json
│       ├── vite.config.js
│       ├── eslint.config.js
│       ├── index.html
│       └── README.md
│
├── uploads/
│   └── documents/
│       └── .gitkeep
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Learning-Assistant.git
```

```bash
cd AI-Learning-Assistant
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GOOGLE_API_KEY=your_google_gemini_api_key

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Run Application

## Backend

```bash
cd server

npm run dev
```

---

## Frontend

```bash
cd client

npm run dev
```

---

# 🌐 API Endpoints

## Authentication

```
POST   /api/auth/register

POST   /api/auth/login

GET    /api/auth/profile

PUT    /api/auth/profile

PUT    /api/auth/change-password
```

---

## Documents

```
POST   /api/documents/upload

GET    /api/documents

GET    /api/documents/:id

DELETE /api/documents/:id
```

---

## AI

```
POST   /api/ai/generate-summary

POST   /api/ai/chat

POST   /api/ai/explain

POST   /api/ai/generate-flashcards

POST   /api/ai/generate-quiz
```

---

# 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected API Routes
- Request Validation
- Secure Environment Variables
- CORS Configuration
- Error Handling Middleware

---

# 🚀 Future Improvements

- Voice Assistant
- AI Study Planner
- OCR Support
- Multiple File Formats
- Notes Synchronization
- Progress Analytics
- Dark Mode
- AI Revision Scheduler
- Multi-language Support
- Study Streaks

---

# 📸 Screenshots

Add screenshots here.

```
/screenshots

Login.png

Dashboard.png

Upload.png

Summary.png

Flashcards.png

Quiz.png
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📝 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ritik Singh**

B.Tech CSE Student

AI & Full Stack Developer

GitHub:
https://github.com/RITIKSINGH-DEOS

LinkedIn:
https://www.linkedin.com/in/ritiksinghdeos

---

<div align="center">

### ⭐ If you found this project helpful, please give it a Star.

Made with ❤️ using MERN Stack and Google Gemini API

</div>