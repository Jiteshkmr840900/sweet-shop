# Sweet Shop Management System

A comprehensive full-stack web application for managing a sweet shop with inventory tracking, user authentication, role-based access control, and purchase management.

## 🍬 Features

### Core Functionality
- User Authentication: Secure registration and login system using JWT authentication
- Role-Based Access Control: Separate permissions for regular users and administrators
- Inventory Management: Full CRUD operations for sweet products (Admin only)
- Purchase System: Users can purchase sweets with automatic stock updates
- Restock Management: Administrators can restock inventory
- Advanced Search & Filtering: Search by name and category
- Real-time Updates: Live inventory updates after purchase and restock
- Responsive Design: Clean, mobile-friendly interface

### User Features
- Register and login securely
- Browse available sweets with detailed information
- Search and filter sweets
- Purchase sweets (disabled when stock is zero)
- View real-time stock availability

### Admin Features
- Add new sweets to inventory
- Update existing sweet information
- Delete sweets from inventory
- Restock inventory quantities
- Access to all user features

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite – Fast build tool and dev server
- Axios – HTTP client
- React Router DOM – Routing
- Context API – Authentication state management
- CSS – Custom global styles

### Backend
- Node.js
- Express.js
- Sequelize ORM
- SQLite – Lightweight runtime database
- JWT – Token-based authentication
- bcryptjs – Secure password hashing

### Testing
- Jest – Testing framework
- Supertest – API integration testing
- Test-Driven Development (TDD)

### Database
- SQLite
- ORM-managed schema via Sequelize
- Runtime database creation

## 📋 Prerequisites
- Node.js 18+
- npm
- Git

## 🚀 Installation & Setup

1. Clone the Repository
git clone <https://github.com/Jiteshkmr840900/sweet-shop>
cd sweet-shop-structure

2. Backend Setup
cd backend
npm install
cp .env.example .env
npm run dev

Backend URL:
http://localhost:5000

3. Frontend Setup
cd frontend
npm install
npm run dev

Frontend URL:
http://localhost:3000

# Login Screen:-https://drive.google.com/file/d/1YptjswZ8YXWubFS-KOCLUy1VrVNaf7-X/view?usp=sharing

## 🏃 Running the Application

Start Backend:
cd backend
npm run dev

Start Frontend:
cd frontend
npm run dev

## 🧪 Running Tests

cd backend
npm test

Test Results:
- Authentication tests: PASS
- Sweet CRUD tests: PASS
- Purchase logic tests: PASS
- Inventory edge cases: PASS
- Role-based access tests: PASS


## 🔐 API Endpoints

Authentication:
POST /api/auth/register
POST /api/auth/login

Sweets:
GET /api/sweets
POST /api/sweets (Admin)
DELETE /api/sweets/:id (Admin)

Inventory:
POST /api/sweets/:id/purchase
POST /api/sweets/:id/restock (Admin)

## 👥 User Roles

User:
- View sweets
- Purchase sweets

Admin:
- Full inventory management
- Restock sweets
- Delete sweets

## 🔒 Security Features
- JWT authentication
- Password hashing
- Role-based authorization
- Protected routes
- Input validation
- CORS enabled

## 🧠 My AI Usage

AI Tool Used: ChatGPT

Usage:
- Project structure planning
- Backend boilerplate generation
- Writing Jest & Supertest tests
- Debugging environment issues
- Documentation writing

Reflection:
AI improved speed and test quality. All AI-generated code was manually reviewed and validated.

## 🚀 Deployment

Backend: Render / Railway / Heroku
Frontend: Vercel / Netlify

## 📝 License
MIT License

## 🐛 Known Issues & Future Enhancements

Current:
- No purchase history
- No image uploads
- No password reset

Planned:
- Admin analytics dashboard
- Email notifications
- Payment gateway integration
- PWA support

## 🙏 Acknowledgments
- Node.js & Express community
- React & Vite teams
- Sequelize ORM
- Jest & Supertest
- Open-source contributors




