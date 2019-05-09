const mongoose = require('mongoose')
const { Schema } = mongoose

const pollSchema = new Schema({
	userID: String,
	pollQuestion: String,
	pollOptions: [
		{
			name: String,
			votes: Number,
		},
	],
	IP: { type: [String], default: [] },
})

const Polls = mongoose.model('poll', pollSchema)

module.exports = Polls
