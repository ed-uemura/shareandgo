const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema({
	type: {
        type: String,
        require: true,
    },
	pan: {
        type: String,
        require: true,
    },
	name: {
        type: String,
        require: true,
		max: 30,
    },
	expiration: {
        type: Date,
        require: true,
    },
	isdefault: {
        type: Boolean,
        require: false,
        default: false,
    },
	address_id: {
        type: String,
        require: false,
		max: 30,
    }, 
},
{ timestamps: true }
);

const AddressSchema = new mongoose.Schema({
	name: {
        type: String,
        require: true,
    },
	address: {
        type: String,
        require: true,
    },
	address2: {
        type: String,
        require: false,
    },
	city: {
        type: String,
        require: true,
    },
	province: {
        type: String,
        require: true,
    },
	zip: {
        type: String,
        require: true,
    },
	isdefault: {
        type: Boolean,
        require: false,
        default: false,
    },
},
{ timestamps: true }
);

const CarSchema = new mongoose.Schema({
	make: {
        type: String,
        require: true,
    },
	model: {
        type: String,
        require: true,
    },
	type: {
        type: String,
        require: true,
    },
	color: {
        type: String,
        require: true,
    },
	year: {
        type: Number,
        require: true,
		min: 1900,
        max: 2100,
    },
	picture: {
        type: String,
        require: false,
    },
	plate: {
        type: String,
        require: true,
    },
	feat_ac: {
        type: Boolean,
        require: false,
        default: false,
    },
	feat_ls: {
        type: Boolean,
        require: false,
        default: false,
    },
	feat_lm: {
        type: Boolean,
        require: false,
        default: false,
    },
	feat_ll: {
        type: Boolean,
        require: false,
        default: false,
    },
	feat_wf: {
        type: Boolean,
        require: false,
        default: false,
    },
	feat_bk: {
        type: Boolean,
        require: false,
        default: false,
    },
	feat_sk: {
        type: Boolean,
        require: false,
        default: false,
    },
	feat_pa: {
        type: Boolean,
        require: false,
        default: false,
    },
},
{ timestamps: true }
);

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
        min: 2,
        max: 25,
    },
    lastname: {
        type: String,
        require: true,
        min: 2,
        max: 25,
    },
    gender: {
        type: String,
        max: 6,
        require: true,
    },
    birthdate: {
        type: Date,
        require: true,
    },
    email: {
        type: String,
        max: 80,
        require: true,
        unique: true,
    },
    phone: {
        type: String,
        max: 20,
        require: true,
    },
    bio: {
        type: String,
        max: 500,
        require: false,
    },
    photo: {
        type: String,
        max: 45,
        require: false,
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 300,
    },
    document: {
        type: String,
        require: false,
        min: 2,
        max: 45,
    },
    validemail: {
        type: Boolean,
        require: false,
        default: false,
    },
    validphone: {
        type: Boolean,
        require: false,
        default: false,
    },
    validdoc: {
        type: Boolean,
        require: false,
        default: false,
    },
    doctype: {
        type: String,
        require: false,
        min: 2,
        max: 20,
    },
    fblink: {
        type: String,
        require: false,
        min: 8,
        max: 45,
    },
    accounttype: {
        type: String,
        require: false,
    },
    accountstatus: {
        type: String,
        require: false,
        default: "ACTIVE",
    },
	car: [CarSchema],
	payment_method: [PaymentMethodSchema],
	address: [AddressSchema]
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
