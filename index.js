const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const auth_user_Router = require('./router/auth_user');
const auth_admin_Router = require('./router/auth_admin');
const userRouter = require('./router/users');
const adminRouter = require('./router/admin');
const bookRouter = require('./router/books');
const borrowRouter = require('./router/borrow');
const dbConnect = require("./config/database");
const mongoose = require('mongoose')
const app = express();

const uri = process.env.APP_URI
app.use(bodyParser.json());
// Basic request logger to debug missing routes / 404 issues
app.use((req,res,next)=>{ console.log(`[REQ] ${req.method} ${req.url}`); next(); });
// CORS: allow requests from local vite dev server and any other supplied origin
app.use(cors({
	origin: function(origin, callback){
		// allow requests with no origin like mobile apps or curl
		if(!origin) return callback(null, true);
		const allowed = [
			"http://localhost:5174", 
			"http://localhost:3000",
			process.env.FRONTEND_ORIGIN,
			process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
		].filter(Boolean);
		if(allowed.length === 0) return callback(null, true);
		if(allowed.includes(origin)) return callback(null, true);
		return callback(new Error('Not allowed by CORS'));
	},
	credentials: true,
}));
dbConnect(uri);

// Health check endpoint
app.get('/api/health', (req, res) => {
	res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/auth/user',auth_user_Router);
app.use('/api/auth/admin',auth_admin_Router);
app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/books',bookRouter);
app.use('/api/borrow',borrowRouter);

// Import and initialize return scheduler
const { handleBorrowManagement } = require('./utils/returnScheduler');

// Ensure the return scheduler is initialized
handleBorrowManagement();

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`This app runs on port ${port}`);
});