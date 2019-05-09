const path = require('path')
const passport = require('passport')
const mongoose = require('mongoose')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')

// Env variables
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') })

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

// Get User model
const User = mongoose.model('user')

// Serialize/deserialize user
passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user)
	})
})

// Callback used to either log in existing user
// or create new user
const login = (accessToken, refreshToken, profile, done) => {
	User.findOne({ profileID: profile.id }).then(existingUser => {
		if (existingUser) {
			done(null, existingUser)
		} else {
			new User({
				profileID: profile.id,
			})
				.save()
				.then(user => done(null, user))
		}
	})
}

// Google Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		login
	)
)
