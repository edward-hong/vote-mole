const { isNil } = require('ramda')

module.exports = (req, res, next) => {
	if (isNil) {
		return res.status(401).send({ error: 'You must log in!' })
	}
	next()
}
