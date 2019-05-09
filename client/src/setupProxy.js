const proxy = require('http-proxy-middleware')

// Proxy all routes starting with /auth or /poll to the backend
module.exports = function(app) {
	app.use(proxy('/auth', { target: 'http://localhost:5000/' }))
	app.use(proxy('/poll', { target: 'http://localhost:5000/' }))
}
