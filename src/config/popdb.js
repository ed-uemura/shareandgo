const User = require("../models/User");
const bcrypt = require("bcrypt");
const Ride = require("../models/Ride");
//const dotenv = require("dotenv");
const Review = require("../models/Review");

// const Chat = require("../../models/Chat");

// Use .ENV config files
//dotenv.config();

var mongoose = require( 'mongoose' )
    , _ = require( 'lodash' )
	, userData = require( './mockdata/userData.json' )
    , reviewData = require( './mockdata/reviewData.json' )
	//, chatData = require( './mockdata/chatData.json' )
	, rideData = require( './mockdata/rideData.json' );

// Connect to the database
// Connecting to MongoDB
mongoose.connect(
	process.env.MONGODB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if(err) console.log(err) 
		else console.log("DB running and connected.");
	   }
	);

//Clear the database
const clearDB = async () => {
	User.deleteMany({}, (err) => {
		if (err) console.log(err);
		else console.log("Users cleared.");
	});
	Review.deleteMany({}, (err) => {
	if (err) console.log(err);
	else console.log("Reviews cleared.");
	});
	// Chat.deleteMany({}, (err) => {
	// 	if (err) console.log(err);
	// 	else console.log("Chats cleared.");
	// });

	Ride.deleteMany({}, (err) => {
		if (err) console.log(err);
		else console.log("Rides cleared.");
	});
};
clearDB();

userMap = {};
carMap = {};
// Add mock data to the database
// Add users
const addUsers = async () => {
	await new Promise(r => setTimeout(r, 1000));
	userData.forEach( async (user) => {
		const{password} = user;
		const crypt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,crypt)
		user = {...user, password: hashedPassword}
		const newUser = new User(user);
		newUser.save((err) => {
			if (err) console.log(err);
			else {
				console.log("User added: "+newUser.id )
				userMap[ user.email ] = newUser.id;
				//console.log(newUser)
				if(newUser.car.length>0){
					for(let i=0; i<newUser.car.length; i++){
						carMap[ newUser.email ] = newUser.car[i].id;
						console.log("Car added:"+newUser.car[i].id)
					}
				}
			}
		});
	});
};
addUsers();



function getMapSize(x) {
    var len = 0;
    for (var count in x) {
            len++;
    }

    return len;
}



const checkUsers = async () => {
	await new Promise(r => setTimeout(r, 3000));
	console.log(getMapSize(userMap)+" USERS LOADED SUCCESSFULLY");
	console.log(getMapSize(carMap)+" CARS LOADED SUCCESSFULLY");
	if(!(carMap) || !(userMap)){
		"ERROR: USERMAP OR CARMAP IS EMPTY";
		exit();
	}
};
checkUsers();
//  populate the ride collection from json data
const addRides = async () => {
	await new Promise(r => setTimeout(r, 5000));
	rideData.forEach((rideEntry) => {
		if(typeof userMap[rideEntry.user_email] !== 'undefined' && typeof carMap[ rideEntry.user_email ] !== 'undefined'){
			// map the user email to the user _id
			rideEntry.user = userMap[ rideEntry.user_email ];
			rideEntry.car = carMap[ rideEntry.user_email ];

			if (rideEntry.passenger){ 
				rideEntry.passenger.user = userMap[ rideEntry.passenger.email ];
			}
			else{
				console.log("No passenger for this ride: " +rideEntry)
			}
			// the same here for the seat_request field
			if (rideEntry.seat_request){
				rideEntry.seat_request.user = userMap[ rideEntry.seat_request.email ];
			}else{
				console.log("No seat_request for this ride: " +rideEntry);
			}
			// delete the user_email field because it is not part of the Ride schema
			delete rideEntry.user_email;
			const newRide = new Ride(rideEntry);
			newRide.save((err) => {
				if (err) {
					console.log(err);
					console.log(rideEntry);
				}
				else console.log("Ride added.");
			});
		}
		else {
					console.log("ERROR: USER OR CAR IS EMPTY");
					console.log("for user: "+rideEntry.user_email);
		}
	});
};
addRides();

//  populate the review collection from json data
const addReviews = async () => {
	await new Promise(r => setTimeout(r, 8000));
	reviewData.forEach((review) => {
		if(userMap[ review.author_email ]!=='' && userMap[ review.reviewed_email]!==''){
			// map the user email to the user _id
			review.author = userMap[review.author_email];
			review.reviewed = userMap[review.reviewed_email];
			// delete the user_email field because it is not part of the Review schema
			delete review.author_email;
			delete review.reviewed_email;
			const newReview = new Review(review);
			newReview.save((err) => {
				if (err) {
					console.log(err);
					console.log(review);
				}
				else console.log("Review added.");
			});
		}
	});
};
addReviews();



