const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const requestIp = require('request-ip')

const authRoutes = require('./routes/authRoutes')
const pollRoutes = require('./routes/pollRoutes')

// Env variables

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const { PORT, NODE_ENV, SESSION_SECRET, MONGO_URL } = process.env

// Run code for User model
// and setting up passport.js strategies

require('./models/User')
require('./auth/setupPassport')

// Mongoose

mongoose.Promise = global.Promise

mongoose
	.connect(MONGO_URL, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
	})
	.catch(err => console.error(err))

// Session info

const commonSessionInfo = {
	secret: SESSION_SECRET,
	saveUninitialized: true,
	resave: true,
}

const sessionInfo = ['production', 'ci'].includes(NODE_ENV)
	? {
			...commonSessionInfo,
			store: new MongoStore({
				mongooseConnection: mongoose.connection,
			}),
	  }
	: { ...commonSessionInfo }

// Express server

const app = express()

app.use(requestIp.mw())

app.use(express.json())

app.use(session(sessionInfo))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRoutes)
app.use('/api/poll', pollRoutes)

if (['production', 'ci'].includes(NODE_ENV)) {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
	})
}

const port = PORT || 5000

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
})
