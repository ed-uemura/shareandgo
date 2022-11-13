const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
	user: {
		ref: 'User',
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'User is mandatory']
	},
	passenger_status: {
        type: String,
        required: [true, 'passenger status is mandatory']
    },
	payment: {
        type: String,
    },
	amount: {
        type: Number,
    },
	driver_status: {
        type: String,
        require: false,
    },
	payment_status: {
        type: String,
    },
},
{ timestamps: true }
);

const SeatRequestSchema = new mongoose.Schema({
	user: {
		ref: 'User',
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'user is mandatory']
	},
	message: {
        type: String,
    },
	date: {
        type: Date,
        required: [true, 'request date is mandatory']
    },
	status: {
        type: String,
        default: "Requested",
    },
    reply_message: {
        type: String,
    },
},
{ timestamps: true }
);

const RideSchema = new mongoose.Schema({
	origin: {
        type: String,
        required: [true, 'origin is mandatory']
    },
	destination: {
        type: String,
        required: [true, 'destination is mandatory']
    },
	waypoint: {
        type: String,
    },
	direction: {
        type: String,
        required: [true, 'direction is mandatory']
    },
	frequency: {
        type: String,
        required: [true, 'frequency is mandatory']
    },
	departure_date: {
        type: Date,
        required: [true, 'departure date is mandatory']
    },
	returning_date: {
        type: Date,
    },
	seats: {
        type: Number,
        required: [true, 'number of seats is mandatory']
    },
	description: {
        type: String,
    },
	price: {
        type: Number,
        required: [true, 'price is mandatory']
    },
	status: {
        type: String,
        required: [true, 'status is mandatory']
    },
	user: {
		ref: 'User',
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'user is mandatory']
	},
	car: {
		ref: 'Car',
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'car is mandatory']
	},
	passenger: [PassengerSchema],
	seat_request: [SeatRequestSchema],
},
{ timestamps: true }
);

module.exports = mongoose.model("Ride", RideSchema);
