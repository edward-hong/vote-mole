const path = require('path')
const passport = require('passport')
const mongoose = require('mongoose')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')

require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') })

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

const User = mongoose.model('user')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user)
	})
})

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
