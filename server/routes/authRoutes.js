const passport = require('passport')
const express = require('express')

const auth = express.Router()

// Google OAuth routes
auth.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile'],
	})
)

auth.get('/google/callback', passport.authenticate('google'), (req, res) => {
	res.redirect('/')
})

// Check if logged in
auth.get('/current_user', (req, res) => {
	res.send(req.user)
})

// Logout
auth.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

module.exports = auth
