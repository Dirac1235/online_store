### Online Store README.md Structure

---

# Online Store

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#Main-Features-of-the-Online-Store)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

This online store is a robust e-commerce platform built using NestJS, designed to cater to the needs of both customers and administrators. The primary purpose of the project is to offer users a seamless and secure shopping experience while enabling administrators to efficiently manage products, orders, and user data. Key objectives include ensuring a responsive and user-friendly interface, implementing secure payment processing, and providing tools for managing the store's inventory and customer interactions. The platform is designed to be scalable and easy to maintain, making it a versatile solution for online retail businesses.


### Main Features of the Online Store

1. **User Authentication and Authorization**
   - Secure user registration and login.
   - Role-based access control (e.g., Admin, Customer).

2. **Product Browsing and Search**
   - View products with detailed descriptions, images, and prices.
   - Search and filter products by categories, price range, and other criteria.

3. **Shopping Cart Functionality**
   - Add products to the shopping cart.
   - Update product quantities and remove items from the cart.
   - View the total cost before checkout.

4. **Order Management**
   - Place orders and view order history.
   - Track the status of current orders.
   - Admin can view and manage all customer orders.

5. **Admin Dashboard**
   - Manage products (add, update, delete).
   - View and manage customer orders.
   - Monitor inventory levels and sales performance.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Dirac1235/online_store.git
   ```
2. Navigate to the project directory
   ```
   cd online-store
   ```
3. Install dependencies:
   ```
   npm install
## Environment Setup

```
Create a `.env` file in the root of the project and add the following variables:
```
```
DATABASE_NAME=your_database_name
DATABASE_USER=your_databse_username
DATABASE_PASSWORD=your_database_password
SECRET=your_session_secret
PORT='3000'
HOST='localhost'
```

## Usage


To start the development server, run:

```
npm run start:dev
```

Then go to [http://localhost:3000](https://localhost:3000).

## API Documentation

```
### Authentication
- **POST** `/auth/login`: Logs in a user.
- **POST** `/auth/register`: Registers a new user.

### Products
- **GET** `/products`: Retrieves a list of products.
- **POST** `/admin/products`: Adds a new product (Admin only).

### Orders
- **POST** `/cart`: Adds items to the user's cart.
- **POST** `/orders`: Places an order.

```
Refer to the complete API documentation start the server and go to the route [http://localhost:3000/api](http://localhost:3000/api).

## Folder Structure

```
src/
│
├── account/              # User account related modules
├── admin/                # Admin-related modules
├── auth/                 # Authentication and authorization
├── cart/                 # Shopping cart functionality
├── models/               # Database models and services
├── validators/           # Input validation logic
├── app.controller.ts     # Main application controller
├── app.module.ts         # Main application module
├── main.ts               # Application entry point
```

## Contributing
I welcome contributions! Please fork the repository and create a pull request with your changes. 

## Acknowledgements
I would like to extend my gratitude to ALX for their invaluable support and resources that have greatly contributed to the development of this project.


```
- [NestJS](https://nestjs.com/) for the backend framework.
- [TypeORM](https://typeorm.io/) for the ORM.
- [Node.js](https://nodejs.org/) for the runtime environment.
- [Handlebars](https://handlebarsjs.com/) for the frontend.
```



