// ================
// Frontend Paths
// ================
export const HOME_PATH = '/'
export const POLL_PATH = '/poll/:id'
export const POLL_BRANCH_PATH = '/poll/'
export const POLLS_USER_PATH = '/my_polls'

// ================
// Backend Paths
// ================

// Auth Paths
export const AUTH_CURRENT_USER_PATH = '/api/auth/current_user'
export const AUTH_LOGOUT_PATH = '/api/auth/logout'
export const AUTH_GOOGLE_LOGIN_PATH = '/api/auth/google'

// Poll Paths
export const POLL_SUBMIT_PATH = '/api/poll/submit'
export const POLL_INFO_BRANCH_PATH = '/api/poll/info/'
export const POLL_DELETE_PATH = '/api/poll/delete/'
export const POLL_VOTE_PATH = '/api/poll/vote'
export const POLLS_ALL_PATH = '/api/poll/all'
export const POLLS_GET_USER_PATH = '/api/poll/user/'

// ================
// Colours
// ================

const graphColours = [
	['#0082c8', '#00a3fb'],
	['#f58231', '#f7a062'],
	['#911eb4', '#b22adb'],
	['#46f0f0', '#75f4f4'],
	['#f032e6', '#f362ec'],
	['#d2f53c', '#ddf76d'],
	['#fabebe', '#feeded'],
	['#e6194b', '#eb476f'],
	['#3cb44b', '#5bc868'],
	['#ffe119', '#ffe84c'],
	['#008080', '#00b3b3'],
	['#e6beff', '#faf1ff'],
	['#aa6e28', '#d08835'],
	['#fffac8', '#fffffb'],
	['#800000', '#b30000'],
	['#aaffc3', '#ddffe7'],
	['#808000', '#b3b300'],
	['#ffd8b1', '#fff2e4'],
	['#000080', '#0000b3'],
	['#333333', '#4d4d4d'],
]

export const COLOURS = {
	primary: '#21252a',
	google: '#ec371b',
	googleShadow: 'rgba(236, 55, 27, 0.5)',
	twitter: '#009cfa',
	twitterShadow: ' rgba(0, 156, 250, 0.5)',
	error: '#dc3545',
	success: '#00b55b',
	gray: '#ccc',
	pageLinkHover: 'rgba(33, 37, 41, 0.7)',
	graphColours,
}

// ================
// Redux Types
// ================

// Auth types
export const AUTH_FETCH_USER_TYPE = '@auth/FETCH_USER'
export const AUTH_FETCH_USER_RECEIVED_TYPE = '@auth/FETCH_USER_RECEIVED'

// Polls types
export const POLLS_ALL_TYPE = '@polls/FETCH_ALL_POLLS'
export const POLLS_ALL_RECEIVED_TYPE = '@polls/FETCH_ALL_POLLS_RECEIVED'
export const POLLS_CLEAR_TYPE = '@polls/CLEAR_POLLS'
export const POLLS_USER_TYPE = '@polls/FETCH_USER_POLLS'
export const POLLS_USER_RECEIVED_TYPE = 'polls/FETCH_USER_POLLS_RECEIVED'

// Poll types
export const POLL_INFO_TYPE = '@poll/FETCH_POLL'
export const POLL_INFO_RECEIVED_TYPE = '@poll/FETCH_POLL_RECEIVED'
export const POLL_CLEAR_TYPE = '@poll/CLEAR_POLL'
export const POLL_VOTE_TYPE = '@poll/VOTE_POLL'
export const POLL_VOTE_ERROR_TYPE = '@poll/VOTE_POLL_ERROR'
export const POLL_VOTE_RECEIVED_TYPE = '@poll/VOTE_POLL_RECEIVED'
