# Food Ordering App

## Table of Contents
1. [About](#about)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Technology Stack](#technology-stack)

---

## About

This is a full-stack web application that implements a food delivery and ordering system. The platform enables users to browse restaurants, add items to a shopping cart, and place orders. Restaurant administrators can manage menus and track incoming orders in real-time.

The application demonstrates core concepts in full-stack development including user authentication, REST API design, database management, and client-server communication.

---

## Prerequisites

Install the following before proceeding:

- Node.js (v14.0 or higher) - https://nodejs.org/
- Git - https://git-scm.com/
- MongoDB or MySQL database - https://www.mongodb.com/ or https://www.mysql.com/

Verify installations by running:
```bash
node --version
npm --version
git --version
```

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/dingoatemybabiess/Food-ordering-app.git
cd Food-ordering-app
```

### Step 2: Backend Setup

Navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/food_ordering
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:3000
```

### Step 3: Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

### Step 4: Database Setup

Ensure your database service is running before starting the application.

**For MongoDB:**
```bash
mongod
```

**For MySQL:**
```bash
mysql -u root -p
```

---

## Running the Application

### Terminal 1: Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5000`

### Terminal 2: Frontend Application

```bash
cd frontend
npm run dev
```

The frontend application will run on `http://localhost:3000`

### Terminal 3: Database

Ensure your database is running. The backend will automatically connect using the credentials in your `.env` file.

Once all services are running, open your browser and navigate to `http://localhost:3000`

---

## Project Structure

```
Food-ordering-app/
|
├── backend/
|   ├── config/              (Database and environment configuration)
|   ├── models/              (Database schemas and data structures)
|   ├── routes/              (API endpoints)
|   ├── controllers/         (Business logic for each route)
|   ├── middleware/          (Authentication and error handling)
|   ├── server.js            (Entry point for backend)
|   ├── package.json         (Dependencies and scripts)
|   └── .env                 (Environment variables)
|
├── frontend/
|   ├── src/
|   |   ├── components/      (Reusable UI components)
|   |   ├── pages/           (Application pages and views)
|   |   ├── services/        (API communication layer)
|   |   └── App.jsx          (Root component)
|   ├── package.json         (Dependencies and scripts)
|   └── .env                 (Environment variables)
|
└── README.md
```

---

## Technology Stack

### Backend
- Node.js - JavaScript runtime environment
- Express.js - Web application framework
- MongoDB/MySQL - Database management system
- JWT - Authentication and authorization
- Bcryptjs - Password encryption

### Frontend
- React.js or Vue.js - UI framework
- Vite - Build tool and development server
- Axios or Fetch API - HTTP client for API communication

### Additional Tools
- Git - Version control
- npm - Package manager

---

## API Endpoints

### Authentication
```
POST /api/auth/register     - User registration
POST /api/auth/login        - User login
```

### Restaurants
```
GET /api/restaurants        - Retrieve all restaurants
GET /api/restaurants/:id    - Retrieve specific restaurant
```

### Menu Items
```
GET /api/menus              - Retrieve all menu items
GET /api/menus/:id          - Retrieve specific menu item
```

### Orders
```
POST /api/orders            - Create new order
GET /api/orders             - Retrieve user orders
GET /api/orders/:id         - Retrieve specific order
```

---

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| PORT | Server listening port | 5000 |
| NODE_ENV | Application environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/food_ordering |
| JWT_SECRET | Secret key for token signing | any_random_string |
| CORS_ORIGIN | Allowed frontend URL | http://localhost:3000 |
| VITE_API_URL | Backend API URL for frontend | http://localhost:5000 |

---

## Troubleshooting

**Port 5000 is already in use:**
Identify and terminate the process using the port, or modify the PORT variable in .env

**Database connection failed:**
Verify that your database service is running and that credentials in .env are correct.

**CORS errors in browser console:**
Ensure CORS_ORIGIN in backend .env matches your frontend URL exactly.

**Module not found errors:**
Run `npm install` again in the respective directory (backend or frontend).

---

## Additional Resources

- Express.js Documentation: https://expressjs.com/
- MongoDB Documentation: https://docs.mongodb.com/
- React Documentation: https://react.dev/
- JWT Introduction: https://jwt.io/
- RESTful API Best Practices: https://restfulapi.net/

---

*Last Updated: December 2025*