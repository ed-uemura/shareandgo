const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// Routes files
const userRoute = require("./src/routes/user")

const app = express();

// Express JSON Middleware
app.use(express.json());

// CORS
// app.use(cors({
//     origin: process.env.CORS_REQUESTS_ORIGIN
// }));
app.use((req, res, next) => {
	const allowedOrigins = process.env.CORS_REQUESTS_ORIGIN;
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		 res.setHeader('Access-Control-Allow-Origin', origin);
	}
	//res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Credentials', true);
	return next();
  });
// app.use(cors());

// Connecting to MongoDB
mongoose.connect(
	process.env.MONGODB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if(err) console.log(err) 
		else console.log("DB running and connected.");
	   }
);

// Routes
app.get('/', (req, res) => {
	res.send('Everything working fine!');
});
app.use("/api/user/", userRoute);
// app.use("/api/car/", userRoute);
// app.use("/api/payment_method/", userRoute);
// app.use("/api/address/", userRoute);
// app.use("/api/ride/", userRoute);
// app.use("/api/passenger/", userRoute);
// app.use("/api/seat_request/", userRoute);
// app.use("/api/upload/", userRoute);

// API Listen
const PORT = process.env.PORT || 5000;
const URL = process.env.BACKEND_URL + ":" + PORT
app.listen(PORT, () => console.log(`Server running on ${URL}`));
