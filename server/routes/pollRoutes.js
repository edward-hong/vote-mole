const express = require('express')
const { equals, not, isNil, gt, map } = require('ramda')

const requireLogin = require('../middlewares/requireLogin')
const Poll = require('../models/Poll')

const poll = express.Router()

// Determine find query from route
const determineFindQuery = req =>
	equals(req.path, '/all')
		? Poll.find({})
		: Poll.find({ userId: req.params.id })

// Calculate the offset and limit from req.query
const getOffset = req =>
	not(isNil(req.query.offset)) ? parseInt(req.query.offset, 10) : 0

const getLimit = req => {
	const limit = not(isNil(req.query.limit)) ? parseInt(req.query.limit, 10) : 5
	return gt(limit, 50) ? 50 : limit
}

// Controller used for both to get all polls and get user's polls
const findData = (req, res) => {
	const offset = getOffset(req)
	const limit = getLimit(req)

	const countPromise = determineFindQuery(req).countDocuments()
	const pollsPromise = determineFindQuery(req)
		.sort({ _id: -1 })
		.skip(offset)
		.limit(limit)
		.then(polls =>
			map(({ _id, pollQuestion }) => ({ id: _id, pollQuestion }), polls)
		)

	Promise.all([countPromise, pollsPromise]).then(([count, polls]) => {
		res.json({ count, polls })
	})
}

// Submit new poll
poll.post('/submit', requireLogin, (req, res) => {
	// Check for existing poll question before submitting
	Poll.findOne({
		userId: req.body.userId,
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
poll.get('/all', findData)

// Get user's polls
poll.get('/user/:id', requireLogin, findData)

// Get individual poll
poll.get('/info/:id', (req, res) => {
	Poll.findById(req.params.id).then(poll => res.send(poll))
})

// Delete poll
poll.delete('/delete/:id', requireLogin, (req, res) => {
	Poll.findByIdAndRemove(req.params.id).then(deletedPoll => {
		if (deletedPoll) res.send({ status: 'Poll deleted' })
		else res.status(400).send({ status: 'Poll not found' })
	})
})

module.exports = poll
