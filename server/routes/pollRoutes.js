const express = require('express')

const requireLogin = require('../middlewares/requireLogin')
const Poll = require('../models/Poll')

const poll = express.Router()

poll.post('/submit', requireLogin, (req, res) => {
	Poll.findOne({
		userID: req.body.userID,
		pollQuestion: req.body.pollQuestion,
	}).then(foundPoll => {
		if (foundPoll) {
			res.status(406).send('failed')
		} else {
			redisClient.flushall()
			new Poll(req.body).save().then(savedPoll => res.send(savedPoll._id))
		}
	})
})

module.exports = poll
