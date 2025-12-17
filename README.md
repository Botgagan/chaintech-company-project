# 🔐 React Authentication Dashboard

A modern, responsive React application featuring a complete user authentication flow. This project demonstrates secure route management, state persistence, and professional UI design using **React**, **Tailwind CSS**, and **Vite**.

![Project Status](https://img.shields.io/badge/React-Tailwindcss-success)
![Tech Stack](https://img.shields.io/badge/Vercel-Vite%20-blue)

## 🚀 Live Demo
**https://chaintech-company-project.vercel.app/**

---

## ✨ Key Features

- **User Authentication:** Complete Login and Registration forms with validation.
- **Session Persistence:** Uses `localStorage` to keep users logged in even after refreshing the page.
- **Protected Routes:** The Dashboard/Profile page is inaccessible without logging in.
- **Auto-Redirects:**
  - If a user registers, they are auto-logged in.
  - If a logged-in user tries to visit the Login page, they are redirected to the Profile.
- **Mock Database:** Simulates a backend database using browser storage to manage multiple user accounts.
- **Responsive Design:** Fully mobile-responsive UI built with Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM (v6)
- **State Management:** React Context API (`AuthContext`)
- **Deployment:** Vercel

---

## 📂 Project Structure

```bash
/Frontend
├── src/
│   ├── components/
│   │   ├── AuthContext.jsx  # Handles global state & "Mock DB" logic
│   │   ├── Login.jsx        # Login Form with validation
│   │   ├── Register.jsx     # Registration Form
│   │   └── Profile.jsx      # Protected User Dashboard
│   ├── App.jsx              # Route definitions
│   └── main.jsx             # Entry point
├── vercel.json              # Deployment configuration for routing
└── vite.config.js           # Vite configuration
