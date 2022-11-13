const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	author: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'author is mandatory']
	},
	rewiewed: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'reviewed is mandatory']
	},
	date: {
        type: Date,
        required: [true, 'date is mandatory']
    },
	comments: {
        type: String,
    },
	rating: {
        type: Number,
        required: [true, 'rating is mandatory']
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
