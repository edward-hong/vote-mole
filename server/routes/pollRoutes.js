const express = require('express')
const { equals } = require('ramda')

const requireLogin = require('../middlewares/requireLogin')
const Poll = require('../models/Poll')

const poll = express.Router()

// Determine find query from route
const determineFindQuery = req =>
	equals(req.path, '/all_polls')
		? Poll.find({})
		: Poll.find({ userId: req.params.id })

// Controller used for both to get all polls and get user's polls
const findData = (req, res) => {
	const countPromise = determineFindQuery(req).countDocuments()
	const pollsPromise = determineFindQuery(req)

	Promise.all([countPromise, pollsPromise]).then(([count, polls]) => {
		res.json({ count, polls })
	})
}

// Submit new poll
poll.post('/submit', requireLogin, (req, res) => {
	// Check for existing poll question before submitting
	Poll.findOne({
		userID: req.body.userID,
		pollQuestion: req.body.pollQuestion,
	}).then(foundPoll => {
		if (foundPoll) {
			res.status(406).send('failed')
		} else {
			new Poll(req.body).save().then(savedPoll => res.send(savedPoll._id))
		}
	})
})

// Get all polls
poll.get('/all_polls', findData)

module.exports = poll
