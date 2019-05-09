import { FETCH_USER_TYPE, FETCH_USER_FULFILLED_TYPE } from '../../../constants'

export const fetchUser = () => ({ type: FETCH_USER_TYPE })

export const fetchUserFulfilled = payload => ({
	type: FETCH_USER_FULFILLED_TYPE,
	payload,
})
