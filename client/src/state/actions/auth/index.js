import { FETCH_USER_TYPE, FETCH_USER_FULFILLED_TYPE } from '../../../constants'

// Fetch for user info from backend
export const fetchUser = () => ({ type: FETCH_USER_TYPE })

// Pass fetched user response to reducer
export const fetchUserFulfilled = payload => ({
	type: FETCH_USER_FULFILLED_TYPE,
	payload,
})
