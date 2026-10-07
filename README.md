# 🏥 Hospital Management System

A full-stack **Hospital Management System** designed to simplify and digitize hospital operations. The application provides a centralized platform for managing patients, doctors, appointments, medical records, authentication, and other hospital-related activities.

## 🚀 Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt
- - redis

### Database
- MongoDB
- Mongoose

### Development Tools
- Git & GitHub
- Postman
- VS Code
- npm

---

## ✨ Features

### 👤 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes
- Role-based access control

### 🧑‍⚕️ Doctor Management
- Add doctors
- View doctor profiles
- Update doctor information
- Manage doctor availability
- View assigned appointments

### 🧑‍🤝‍🧑 Patient Management
- Register patients
- View patient information
- Update patient details
- Manage patient records
- View medical history

### 📅 Appointment Management
- Book appointments
- View appointments
- Update appointment status
- Cancel appointments
- Manage doctor-patient appointments

### 📋 Medical Records
- Store patient medical information
- Maintain medical history
- Manage diagnosis and treatment information

### 📊 Dashboard
- Hospital overview
- Patient statistics
- Doctor statistics
- Appointment statistics
- Role-based dashboard

---

## 🏗️ Project Architecture

```text
Hospital Management System
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 Application Flow

```text
User
 │
 ▼
Frontend (React)
 │
 ▼
REST API
 │
 ▼
Backend (Node.js + Express)
 │
 ▼
Authentication / Authorization
 │
 ▼
MongoDB Database
```

---

## 🔐 Authentication Flow

```text
Register
   ↓
User Data
   ↓
Password Hashing
   ↓
MongoDB
   ↓
Login
   ↓
JWT Token
   ↓
Protected Routes
   ↓
Authorized User
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hospital-management-system.git
```

### 2. Navigate to the Project

```bash
cd hospital-management-system
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 5. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Never upload your `.env` file or database credentials to GitHub.

### 6. Start Backend

```bash
cd backend
npm run dev
```

### 7. Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔌 API Structure

Example API endpoints:

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Patients

```text
GET    /api/patients
GET    /api/patients/:id
POST   /api/patients
PUT    /api/patients/:id
DELETE /api/patients/:id
```

### Doctors

```text
GET    /api/doctors
GET    /api/doctors/:id
POST   /api/doctors
PUT    /api/doctors/:id
DELETE /api/doctors/:id
```

### Appointments

```text
GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
```

---

## 🛡️ Security

The application implements several security practices:

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based authorization
- Environment variables for sensitive credentials
- Server-side validation

---

## 📸 Screenshots

Add screenshots of your application here.

```text
screenshots/
├── login.png
├── dashboard.png
├── patients.png
├── doctors.png
└── appointments.png
```

---

## 🔮 Future Improvements

- Online payment integration
- Prescription management
- Pharmacy management
- Laboratory management
- Email/SMS notifications
- Doctor availability calendar
- Advanced analytics
- PDF medical reports
- Cloud deployment
- Docker support
- Redis caching
- Automated testing

---

## 🎯 Project Objective

The main objective of this project is to build a scalable full-stack hospital management platform that reduces manual hospital operations and provides a centralized system for managing patients, doctors, appointments, and medical records.

---

## 👨‍💻 Developer

**Prince Pawar**

BCA Student | Full Stack Developer

### Skills

`React.js` `Node.js` `Express.js` `MongoDB` `JavaScript` `REST API` `JWT` `Git` `GitHub`

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is created for educational and portfolio purposes.
