const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema({
	type: {
        type: String,
        required: [true, 'Please add a payment type']
    },
	pan: {
        type: String,
        required: [true, 'Please add the card number']
    },
	name: {
        type: String,
		max: 30,
        required: [true, 'Please add a payment name']
    },
	expiration: {
        type: Date,
        required: [true, 'Please add the payment expiration date']
    },
	isdefault: {
        type: Boolean,
        default: false,
    },
	address_id: {
        type: String,
		max: 30,
    }, 
},
{ timestamps: true }
);

const AddressSchema = new mongoose.Schema({
	name: {
        type: String,
        required: [true, 'Please add a name for the address']
    },
	address: {
        type: String,
        required: [true, 'Please add street number and address']
    },
	address2: {
        type: String,
    },
	city: {
        type: String,
        required: [true, 'Please add a city name']
    },
	province: {
        type: String,
        required: [true, 'Please add a province name']
    },
	zip: {
        type: String,
        required: [true, 'Please add a zip code']
    },
	isdefault: {
        type: Boolean,
        default: false,
    },
},
{ timestamps: true }
);

const CarSchema = new mongoose.Schema({
	make: {
        type: String,
        required: [true, 'Please add the car manufacturer']
    },
	model: {
        type: String,
        required: [true, 'Please add the car model']
    },
	type: {
        type: String,
        required: [true, 'Please add the car type']
    },
	color: {
        type: String,
        required: [true, 'Please add the car color']
    },
	year: {
        type: Number,
		min: 1900,
        max: 2100,
        required: [true, 'Please add the car model year']
    },
	picture: {
        type: String,
    },
	plate: {
        type: String,
        required: [true, 'Please add the car plate number']
    },
	feat_ac: {
        type: Boolean,
        default: false,
    },
	feat_ls: {
        type: Boolean,
        default: false,
    },
	feat_lm: {
        type: Boolean,
        default: false,
    },
	feat_ll: {
        type: Boolean,
        default: false,
    },
	feat_wf: {
        type: Boolean,
        default: false,
    },
	feat_bk: {
        type: Boolean,
        default: false,
    },
	feat_sk: {
        type: Boolean,
        default: false,
    },
	feat_pa: {
        type: Boolean,
        default: false,
    },
},
{ timestamps: true }
);

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        min: 2,
        max: 25,
        required: [true, 'Please add a first name']
    },
    lastname: {
        type: String,
        min: 2,
        max: 25,
        required: [true, 'Please add a last name']
    },
    gender: {
        type: String,
        max: 6,
    },
    birthdate: {
        type: Date,
    },
    email: {
        type: String,
        max: 80,
        unique: true,
        required: [true, 'Please add an email']
    },
    phone: {
        type: String,
        max: 20,
    },
    bio: {
        type: String,
        max: 500,
    },
    photo: {
        type: String,
        max: 45,
    },
    password: {
        type: String,
        min: 8,
        max: 300,
        required: [true, 'Please add a password']
    },
    document: {
        type: String,
        min: 2,
        max: 45,
    },
    validemail: {
        type: Boolean,
        default: false,
    },
    validphone: {
        type: Boolean,
        default: false,
    },
    validdoc: {
        type: Boolean,
        default: false,
    },
    doctype: {
        type: String,
         min: 2,
        max: 20,
    },
    fblink: {
        type: String,
        min: 8,
        max: 45,
    },
    accounttype: {
        type: String,
    },
    accountstatus: {
        type: String,
        default: "ACTIVE",
    },
    token: {        
        type: String,
    },
	car: [CarSchema],
	payment_method: [PaymentMethodSchema],
	address: [AddressSchema]
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
