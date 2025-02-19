# ToDo App



A simple and secure ToDo application built with **React**, **Node.js**, **Express**, and **MongoDB**. The app allows users to register, login, manage tasks, and reset forgotten passwords.

## 🚀 Live Demo

🔗 **[ToDo App](https://todo-swart-mu.vercel.app/)**

## 📌 Features

- **User Authentication** (Register, Login, Logout)
- **Role-Based Authorization**
- **JWT-based session management**
- **Create, Read, Update, and Delete (CRUD) tasks**
- **Task filtering by status and deadline**
- **Forgot Password & Reset Password functionality**
- **Responsive UI with React Router**

## 🛠️ Technologies Used

### Frontend

- React
- React Router
- CSS
- Vercel (Deployment)

### Backend

- Node.js
- Express.js
- MongoDB (Atlas)
- JWT for authentication
- Bcrypt.js for password hashing
- Nodemailer for sending emails
- Render (Deployment)

## 📂 Project Structure

```
📦 todo-app
├── 📂 to-do (Frontend)
│   ├── 📄 App.jsx
│   ├── 📄 Home.jsx
│   ├── 📄 Login.jsx
│   ├── 📄 Register.jsx
│   ├── 📄 ForgotPassword.jsx
│   ├── 📄 ResetPassword.jsx
│   └── 📄 styles.css
│
├── 📂 server (Backend)
│   ├── 📂 Routes
│   │   ├── auth.js (Authentication)
│   │   ├── tasks.js (Task Management)
│   │
│   ├── 📂 Models
│   │   ├── users.js
│   │   ├── todo.js
│   │
│   ├── 📄 index.js (Server Entry Point)
│   ├── 📄 .env (Environment Variables)
│   ├── 📄 package.json
│
├── 📄 README.md
```

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/suyash9140/Todo.git
cd todo-app
```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd to-do
npm install
```

#### Backend

```bash
cd server
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the `server` folder:

```plaintext
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
FRONTEND_URL=https://todo-swart-mu.vercel.app
```

### 4️⃣ Run the Application

#### Backend

```bash
cd server
node index.js
```

#### Frontend

```bash
cd to-do
npm start
```

## 🚀 Deployment

### Frontend (Vercel)

1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel`

### Backend (Render)

1. Push code to GitHub
2. Create a new service on [Render](https://render.com/)
3. Connect the repository and deploy

## 🔥 API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/forgot-password` - Send password reset email
- `POST /auth/reset-password/:token` - Reset password

### Tasks

- `GET /get` - Get all tasks (Authenticated)
- `POST /add` - Add a new task (Authenticated)
- `PUT /update/:id` - Update task status (Authenticated)
- `DELETE /delete/:id` - Delete task (Authenticated)

## 📌 Contributors

- **[Suyash Singh](https://github.com/suyash9140)** (Maintainer)

## ⭐️ Show Your Support

Give a ⭐️ if you like this project!





