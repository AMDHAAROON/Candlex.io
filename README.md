# 🕯️ CandleX – Mini MERN E-Commerce Website

A simple candle shop project built for learning full-stack development.

🌐 **Live Demo**  
[https://candlex-io.vercel.app](https://candlex-io.vercel.app)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Firebase Authentication
- Fetch API

### Backend
- Node.js + Express
- MongoDB (Local / Atlas)
- Mongoose ORM
- REST API

---

## ⭐ Features

### 🔐 Authentication
- Login/Signup with Firebase Auth  
- Automatically loads cart on login  

### 🛒 Cart System (Full CRUD)
- Add items  
- Increase / decrease quantity  
- Delete items  
- Clear entire cart  
- Navbar shows total quantity dynamically  
- Cart synced with MongoDB  

---

## ⚙️ Backend CRUD Routes

| Method | Route                                      | Description              |
|--------|--------------------------------------------|--------------------------|
| POST   | `/api/CartCollection/:uid`                 | Add item to cart         |
| GET    | `/api/CartCollection/:uid`                 | Fetch user cart          |
| PUT    | `/api/CartCollection/:uid/update-quantity` | Update quantity       |
| DELETE | `/api/CartCollection/:uid/:productId`      | Delete one item          |
| DELETE | `/api/CartCollection/:uid`                 | Clear entire cart        |

---

## 📁 Project Structure

CandleX/
│
├── backend/
│   ├── models/
│   └── server.js
│    
└──frontend/
    ├── Components/
    ├── pages/
    ├── Utility/
    └── main.jsx
    
---

## 🔧 Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone [https://github.com/AMDHAAROON/Candlex.io.git](https://github.com/AMDHAAROON/Candlex.io.git)
cd candlex

##  Backend Setup

```bash
cd backend
npm install

### Create .env file in your backend

MONGO_URI=mongodb://ip address/database name
PORT=5000

## 🚀 Start the backend

node server.js

### 2️⃣ Frontend Setup

cd frontend
npm install
npm run dev

## 🔄 Sync Cart Across Devices

To sync cart across multiple devices:

- Host backend on **Render** or **Railway**  
- Use **MongoDB Atlas**  
- Replace all frontend API URLs with your deployed backend URL  
- Host the frontend on vercel or anyother services you want.




