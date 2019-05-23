const express = require('express')
const redis = require('promise-redis')()
const { equals, not, isNil, gt, map, is, pipe } = require('ramda')

const requireLogin = require('../middlewares/requireLogin')
const Poll = require('../models/Poll')

const poll = express.Router()

// Redis configuration
const redisClient = redis.createClient(process.env.REDIS_URL)
const redisExpiryTime = 60 // in seconds

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

// Handle stringifying and parsing polls data

const stringifyPolls = pipe(
	map(JSON.stringify),
	JSON.stringify
)

const parsePolls = pipe(
	JSON.parse,
	map(JSON.parse)
)

// Controller used for both to get all polls and get user's polls
const findData = (req, res) => {
	const offset = getOffset(req)
	const limit = getLimit(req)

	// Generate unique key for redis caching
	const redisCacheKey = JSON.stringify({
		...determineFindQuery(req)
			.sort({ _id: -1 })
			.skip(offset)
			.limit(limit)
			.getOptions(),
		path: req.path,
	})

	// Get cached data from redis
	const getCountFromRedis = redisClient.hget(redisCacheKey, 'polls')
	const getPollsFromRedis = redisClient.hget(redisCacheKey, 'count')

	Promise.all([getCountFromRedis, getPollsFromRedis])
		.then(([polls, count]) => {
			if (is(String, polls)) {
				res.json({
					count,
					polls: parsePolls(polls),
				})
			} else {
				return Promise.reject()
			}
		})
		.catch(() => {
			const countPromise = determineFindQuery(req).countDocuments()
			const pollsPromise = determineFindQuery(req)
				.sort({ _id: -1 })
				.skip(offset)
				.limit(limit)
				.then(polls =>
					map(({ _id, pollQuestion }) => ({ id: _id, pollQuestion }), polls)
				)

			Promise.all([countPromise, pollsPromise]).then(([count, polls]) => {
				// Heroku's free tier doesn't provide data persistence for Redis.
				// So only pass in expiry arguments when app isn't in production

				const redisCountArr = [redisCacheKey, 'count', count]
				const redisPollsArr = [redisCacheKey, 'polls', stringifyPolls(polls)]

				if (process.env.NODE_ENV !== 'production') {
					const expireArr = ['EX', redisExpiryTime]
					redisClient.hset(...redisCountArr, ...expireArr)
					redisClient.hset(...redisPollsArr, ...expireArr)
				} else {
					redisClient.hset(...redisCountArr)
					redisClient.hset(...redisPollsArr)
				}

				res.json({ count, polls })
			})
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
			redisClient.flushall()
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

// Vote on poll
poll.put('/vote', (req, res) => {
	if (equals(req.body.selection, "I'd like a custom option")) {
		Poll.findOneAndUpdate(
			{
				_id: req.body.id,
				'pollOptions.option': { $ne: req.body.customSelection },
				ip: { $ne: req.clientIp },
			},
			{
				$addToSet: {
					pollOptions: {
						option: req.body.customSelection,
						votes: 1,
					},
				},
				$push: {
					ip: req.clientIP,
				},
			},
			{ new: true }
		)
			.then(updatedPoll => {
				updatedPoll ? res.send(updatedPoll) : res.status(304).send(updatedPoll)
			})
			.catch(err => res.send(err))
	} else {
		Poll.findOneAndUpdate(
			{
				_id: req.body.id,
				pollOptions: {
					$elemMatch: { option: req.body.selection },
				},
				ip: { $ne: req.clientIp },
			},
			{
				$inc: { 'pollOptions.$.votes': 1 },
				$push: {
					ip: req.clientIp,
				},
			},
			{ new: true }
		)
			.then(updatedPoll => {
				res.send(updatedPoll)
			})
			.catch(err => res.send(err))
	}
})

// Delete poll
poll.delete('/delete/:id', requireLogin, (req, res) => {
	redisClient.flushall()
	Poll.findByIdAndRemove(req.params.id).then(deletedPoll => {
		if (deletedPoll) res.send({ status: 'Poll deleted' })
		else res.status(400).send({ status: 'Poll not found' })
	})
})

module.exports = poll
