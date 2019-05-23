const path = require('path')
const passport = require('passport')
const mongoose = require('mongoose')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { Strategy: GithubStrategy } = require('passport-github')

// Env variables
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') })

const {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	FACEBOOK_CLIENT_ID,
	FACEBOOK_SECRET_KEY,
	GITHUB_CLIENT_ID,
	GITHUB_SECRET_KEY,
	TWITTER_CLIENT_ID,
	TWITTER_SECRET_KEY,
} = process.env

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
			callbackURL: '/api/auth/google/callback',
			proxy: true,
		},
		login
	)
)

// Facebook Strategy

passport.use(
	new FacebookStrategy(
		{
			clientID: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_SECRET_KEY,
			callbackURL: '/api/auth/facebook/callback',
			profileFields: ['id', 'name'],
			proxy: true,
		},
		login
	)
)

// Twitter Strategy

passport.use(
	new TwitterStrategy(
		{
			consumerKey: TWITTER_CLIENT_ID,
			consumerSecret: TWITTER_SECRET_KEY,
			callbackURL: '/api/auth/twitter/callback',
			proxy: true,
		},
		login
	)
)

// Github Strategy

passport.use(
	new GithubStrategy(
		{
			clientID: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_SECRET_KEY,
			callbackURL: '/api/auth/github/callback',
			proxy: true,
		},
		login
	)
)
