MERN Blog Application

A full-stack **Blog Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.
This application allows users to **register, login, create blogs, edit blogs, delete blogs, and view blog posts** with secure authentication.

---

## Features

* User Registration and Login
* Secure Authentication using JWT
* Password Encryption using bcrypt
* Create Blog Posts
* Read/View Blogs
* Update/Edit Blog Posts
* Delete Blog Posts
* Protected Routes for Authenticated Users
* Responsive UI using React

---

## Tech Stack

**Frontend**

* React.js
* React Router
* Axios
* CSS / Tailwind CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* JWT (JSON Web Token)
* bcrypt

---

## Project Structure

```
mern-blog-app
│
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── blogController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── User.js
│   │   └── Blog.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── blogRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Installation

### 1 Clone the Repository

```
git clone https://github.com/yourusername/mern-blog-app.git
```

```
cd mern-blog-app
```

---

### 2 Install Backend Dependencies

```
cd backend
npm install
```

---

### 3 Install Frontend Dependencies

```
cd ../frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the **backend folder**.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Running the Application

### Start Backend Server

```
cd backend
npm start
```

---

### Start Frontend

Open another terminal.

```
cd frontend
npm run dev
```

---

## API Endpoints

### Authentication

Register User

```
POST /api/auth/register
```

Login User

```
POST /api/auth/login
```

---

### Blog Routes

Get All Blogs

```
GET /api/blogs
```

Get Blog by ID

```
GET /api/blogs/:id
```

Create Blog

```
POST /api/blogs
```

Update Blog

```
PUT /api/blogs/:id
```

Delete Blog

```
DELETE /api/blogs/:id
```

---

## Screenshots (Optional)

You can add screenshots of the application here.

Example:

* Home Page
* Login Page
* Dashboard
* Blog Editor

---

## Future Improvements

* Blog Comments
* Blog Likes
* Image Upload
* Rich Text Editor
* User Profile Page
* Admin Dashboard

---

## Author

Developed by **Harini**

---
