const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
	sender: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'sender is mandatory']
	},
	receiver: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'receiver is mandatory']
	},
	date: {
        type: Date,
        required: [true, 'date is mandatory']
    },
	message: {
        type: String,
        required: [true, 'message is mandatory']
    },
	status: {
        type: String,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
