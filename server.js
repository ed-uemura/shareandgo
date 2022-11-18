const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';
const auth = require("./src/middleware/auth");
const bodyParser = require('body-parser');

const app = express();


// SWAGGER CODE
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./src/config/openapi3_0.json')
var options = {	explorer: true };
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, options))

if(env==='development'){
	const dotenv = require('dotenv');
	dotenv.config();
}
// Routes files
const userRoute = require("./src/routes/userRoute")
const carRoute = require("./src/routes/carRoute")
const addressRoute = require("./src/routes/addressRoute")
const paymentRoute = require("./src/routes/paymentRoute")
const rideRoute = require("./src/routes/rideRoute")
const passengerRoute = require("./src/routes/passengerRoute")
const seatRoute = require("./src/routes/seatRoute")
const chatRoute = require("./src/routes/chatRoute")
const uploadRoute = require("./src/routes/uploadRoute")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use(cors(
//	{origin: ['172.218.36.29', '70.64.0.0/12']}
	));

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
app.get('/'||'/api', (req, res) => {
	res.send('Everything working fine!');
});
app.use("/api/user/", userRoute);
app.use("/api/car/", carRoute);
app.use("/api/payment/", paymentRoute);
app.use("/api/address/", addressRoute);
app.use("/api/ride/", rideRoute);
app.use("/api/passenger/", passengerRoute);
app.use("/api/seat/", seatRoute);
app.use("/api/chat/", chatRoute);
app.use("/api/upload/", uploadRoute);

app.use("*", (req, res) => {
	res.status(405).json({
	  success: "false",
	  message: "Page not found",
	  error: {
		statusCode: 405,
		message: "Method Not Allowed. Please check the URL and method.",
	  },
	});
  });

// API Listen
const PORT = process.env.PORT || 5000;
const URL = process.env.BACKEND_URL + ":" + PORT
app.listen(PORT, () => console.log(`Server running on ${URL}`));
