const proxy = require('http-proxy-middleware')

// Proxy all routes starting with /auth or /poll to the backend
module.exports = function(app) {
	app.use(proxy('/api/auth', { target: 'http://localhost:5000/' }))
	app.use(proxy('/api/poll', { target: 'http://localhost:5000/' }))
}
