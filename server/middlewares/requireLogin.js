const { isNil } = require('ramda')

// Only continue is req.user exists
// i.e. whether a user is logged in
module.exports = (req, res, next) => {
	if (isNil(req.user)) {
		return res.status(401).send({ error: 'You must log in!' })
	}
	next()
}
