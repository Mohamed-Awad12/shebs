require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/database');

// Import routers
const auth_user_Router = require('./router/auth_user');
const auth_admin_Router = require('./router/auth_admin');
const userRouter = require('./router/users');
const adminRouter = require('./router/admin');
const bookRouter = require('./router/books');
const borrowRouter = require('./router/borrow');

const app = express();

const uri = process.env.APP_URI;

app.use(bodyParser.json());

// Basic request logger to debug missing routes / 404 issues
app.use((req, res, next) => { 
  console.log(`[REQ] ${req.method} ${req.url}`); 
  next(); 
});

// CORS: allow requests from local vite dev server and any other supplied origin
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    const allowed = [
      "http://localhost:5174",
      "http://localhost:3000",
      process.env.FRONTEND_ORIGIN,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
    ].filter(Boolean);
    if (allowed.length === 0) return callback(null, true);
    if (allowed.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Connect to database
dbConnect(uri).catch(err => {
  console.error('Database connection failed:', err);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Mount API routes
app.use('/auth/user', auth_user_Router);
app.use('/auth/admin', auth_admin_Router);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/book', bookRouter);
app.use('/borrow', borrowRouter);

// Import and initialize return scheduler
const { handleBorrowManagement } = require('./utils/returnScheduler');

// Ensure the return scheduler is initialized
handleBorrowManagement();

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Add 404 handler for API routes
app.use('*', (req, res) => {
  console.log('Unmatched route:', req.originalUrl);
  res.status(404).json({ message: 'API route not found', path: req.originalUrl });
});

module.exports = app;

// For local development
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
