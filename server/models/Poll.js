const mongoose = require('mongoose')
const { Schema } = mongoose

const pollSchema = new Schema({
	userID: String,
	pollQuestion: String,
	pollOptions: [
		{
			option: String,
			votes: { type: Number, default: 0 },
		},
	],
	IP: { type: [String], default: [] },
})

const Polls = mongoose.model('poll', pollSchema)

module.exports = Polls
