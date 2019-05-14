import {
	AUTH_FETCH_USER_TYPE,
	AUTH_FETCH_USER_RECEIVED_TYPE,
} from '../../../constants'

// Fetch for user info from backend
export const fetchUser = () => ({ type: AUTH_FETCH_USER_TYPE })

// Pass fetched user response to reducer
export const dispatchUserReceived = payload => ({
	type: AUTH_FETCH_USER_RECEIVED_TYPE,
	payload,
})
