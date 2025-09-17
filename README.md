# Library Management System

A full-stack library management system built with React (frontend) and Express.js (backend).

## Project Structure

- **Backend**: Express.js server with MongoDB database
- **Frontend**: React application built with Vite
- **Database**: MongoDB (configured via environment variables)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
APP_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
FRONTEND_ORIGIN=your_frontend_url
PORT=3000
```

## Local Development

1. Install backend dependencies:
   ```bash
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd client && npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

4. Start the frontend development server:
   ```bash
   cd client && npm run dev
   ```

## Vercel Deployment

This project is configured for deployment on Vercel with the following setup:

### Prerequisites

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`

### Deployment Steps

1. **Push to GitHub/GitLab/Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your repository
   - Vercel will automatically detect the configuration

3. **Environment Variables**:
   Add these environment variables in your Vercel project settings:
   - `APP_URI`: Your MongoDB connection string
   - `SECRET_KEY`: Your JWT secret key
   - `FRONTEND_ORIGIN`: Your Vercel app URL (e.g., https://your-app.vercel.app)

4. **Deploy**:
   - Vercel will automatically build and deploy your application
   - The backend will be available at `/api/*` routes
   - The frontend will be served at the root

### Architecture on Vercel

- **Frontend**: Static React build served at the root
- **Backend**: Node.js serverless functions at `/api/*`
- **Database**: MongoDB (external)

### API Routes

All backend routes are prefixed with `/api`:
- `/api/auth/user` - User authentication
- `/api/auth/admin` - Admin authentication
- `/api/users` - User management
- `/api/admin` - Admin operations
- `/api/books` - Book management
- `/api/borrow` - Borrowing operations

## Features

- User authentication and authorization
- Book management
- Borrowing system
- Admin panel
- Profile management
- Borrowing history
- Notifications

## Technologies Used

### Backend
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests
- node-cron for scheduled tasks

### Frontend
- React 19
- React Router DOM
- Axios for API calls
- Vite for building and development

## Project Configuration Files

- `vercel.json`: Vercel deployment configuration
- `vite.config.js`: Vite configuration for the frontend
- `.env`: Environment variables (not committed to git)
- `.gitignore`: Git ignore patterns
# shebs
