const mongoose = require('mongoose')
const { Schema } = mongoose

const pollSchema = new Schema({
	userId: String,
	pollQuestion: String,
	pollOptions: [
		{
			option: String,
			votes: { type: Number, default: 0 },
		},
	],
	ip: { type: [String], default: [] },
})

const Polls = mongoose.model('poll', pollSchema)

module.exports = Polls
