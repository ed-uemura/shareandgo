const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
	sender: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        require: true,
	},
	receiver: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        require: true,
	},
	date: {
        type: Date,
        require: true,
    },
	message: {
        type: String,
        require: true,
    },
	status: {
        type: String,
        require: false,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
