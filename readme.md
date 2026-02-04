# TaskFlow

A high-performance MERN stack task manager with a custom "Midnight Slate" dark theme. This project focuses on clean code, smooth micro-interactions, and a premium user experience.

## Project Structure

- **frontend/**: React.js application powered by Tailwind CSS and Lucide icons.
- **backend/**: Node.js/Express API with MongoDB for data storage.

## Quick Start

### 1. Setup the Backend

Navigate to the backend directory and install dependencies:
cd backend
npm install

### 2. Setup the Frontend

Navigate to the frontend directory and install dependencies:
cd frontend
npm install

### 3. Start the Frontend

Navigate to the frontend directory and run:
npm run dev

### 4. Start the Backend

Navigate to the backend directory and run:
npm run dev


### 5 How I would scale this for production:
Database: Implement Mongoose Indexing on userId and createdAt fields to ensure query performance remains $O(log n)$ as the database grows to millions of records.
Performance: Integrate Redis to cache user sessions and frequently accessed task lists, reducing the direct hit rate on MongoDB.
Security: Add express-rate-limit to prevent API abuse and migrate JWT storage from localStorage to HttpOnly Cookies to eliminate XSS vulnerability.
Infrastructure: Containerize the application using Docker and deploy via a Load Balancer (like AWS ELB or Nginx) to handle horizontal scaling across multiple server instances.