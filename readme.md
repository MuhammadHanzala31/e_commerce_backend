# Zee Commerce - Backend

![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-orange)
![JWT](https://img.shields.io/badge/JWT-Authentication-yellow)
![License](https://img.shields.io/badge/License-ISC-lightgrey)

Zee Commerce is a backend application built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. It provides APIs for user authentication, product management, cart functionality, and more.

---

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT.
- **Email Verification**: Welcome emails sent using Nodemailer.
- **Product Management**: APIs to create, fetch, and manage products.
- **Cart Functionality**: Add, update, and delete items in the cart.
- **Protected Routes**: Middleware for route protection.
- **Category Management**: Products organized by categories.
- **Cloudinary Integration**: For uploading and storing images.
- **Stripe Integration**: For handling payments (coming soon).

---

## 🛠️ Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Secure authentication.
- **Nodemailer**: Email service for notifications.
- **Cloudinary**: Image upload and storage.
- **Multer**: File upload middleware.

---

## 🚀 Postman Guide Link

- **[Postman Link](https://.postman.co/workspace/My-Workspace~80d63652-5652-4f39-8691-2b4923afd16b/collection/41630132-541bf39d-3a33-4e43-a32f-ea73b3423732?action=share&creator=41630132).
---

## 📁 Project Structure

backend/ 
├── node_modules/
├── public/
├── src/ 
│ ├── controllers/
│ │ ├── cart.controller.js
│ │ ├── category.controller.js
│ │ ├── product.controller.js
│ │ └── user.controller.js
│ ├── db/
│ │ └── index.js
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ └── multer.middleware.js
│ ├── models/
│ │ ├── cart.model.js
│ │ ├── category.model.js
│ │ ├── product.model.js
│ │ └── user.model.js
│ ├── routes/
│ |
│ │ ├── cart.routes.js
│ │ ├── category.routes.js
│ │ ├── product.routes.js
│ │ └── user.routes.js
│ |── utils/
│ │ ├── apiError.js
│ │ ├── apiError.js
│ │ ├── cloudinary.js
│ │ ├── sendMail.js
│ │ └── apiResponse.js
│ ├── app.js
│ ├── index.js
├── .env
├── package.json
├── package-lock.json
└── README.md
