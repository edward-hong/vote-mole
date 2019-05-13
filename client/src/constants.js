// Frontend Paths
export const HOME_PATH = '/'
export const POLL_PATH = '/poll/:id'
export const POLL_BRANCH_PATH = '/poll/'

// Backend Paths
export const AUTH_CURRENT_USER_PATH = '/api/auth/current_user'
export const AUTH_LOGOUT_PATH = '/api/auth/logout'
export const AUTH_GOOGLE_LOGIN_PATH = '/api/auth/google'

export const POLL_SUBMIT_PATH = '/api/poll/submit'

// Colours
export const COLOURS = {
	primary: '#21252a',
	google: '#ec371b',
	googleShadow: 'rgba(236, 55, 27, 0.5)',
	error: '#dc3545',
}

// Redux Action Types
export const FETCH_USER_TYPE = '@auth/FETCH_USER'
export const FETCH_USER_FULFILLED_TYPE = '@auth/FETCH_USER_FULFILLED'
