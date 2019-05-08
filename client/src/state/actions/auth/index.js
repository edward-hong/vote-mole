import { FETCH_USER, FETCH_USER_FULFILLED } from '../../../constants'

export const fetchUser = () => ({ type: FETCH_USER })

export const fetchUserFulfilled = payload => ({
	type: FETCH_USER_FULFILLED,
	payload,
})
