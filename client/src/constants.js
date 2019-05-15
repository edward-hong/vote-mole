// ================
// Frontend Paths
// ================
export const HOME_PATH = '/'
export const POLL_PATH = '/poll/:id'
export const POLL_BRANCH_PATH = '/poll/'
export const POLL_USER_PATH = '/my_polls'

// ================
// Backend Paths
// ================

// Auth Paths
export const AUTH_CURRENT_USER_PATH = '/api/auth/current_user'
export const AUTH_LOGOUT_PATH = '/api/auth/logout'
export const AUTH_GOOGLE_LOGIN_PATH = '/api/auth/google'

// Poll Paths
export const POLL_SUBMIT_PATH = '/api/poll/submit'
export const POLL_ALL_PATH = '/api/poll/all'
export const POLL_GET_USER_PATH = '/api/poll/user/'

// ================
// Colours
// ================

export const COLOURS = {
	primary: '#21252a',
	google: '#ec371b',
	googleShadow: 'rgba(236, 55, 27, 0.5)',
	error: '#dc3545',
	success: '#00b55b',
	gray: '#ccc',
	pageLinkHover: 'rgba(33, 37, 41, 0.7)',
}

// ================
// Redux Types
// ================

// Auth types
export const AUTH_FETCH_USER_TYPE = '@auth/FETCH_USER'
export const AUTH_FETCH_USER_RECEIVED_TYPE = '@auth/FETCH_USER_RECEIVED'

// Poll types
export const POLL_ALL_TYPE = '@polls/FETCH_ALL_POLLS'
export const POLL_ALL_RECEIVED_TYPE = '@polls/FETCH_ALL_POLLS_RECEIVED'
export const POLL_CLEAR_TYPE = '@polls/CLEAR_POLLS'
export const POLL_USER_TYPE = '@polls/FETCH_USER_POLLS'
export const POLL_USER_RECEIVED_TYPE = 'polls/FETCH_USER_POLLS_RECEIVED'
