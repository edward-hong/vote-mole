import {
	POLLS_ALL_TYPE,
	POLLS_ALL_RECEIVED_TYPE,
	POLLS_CLEAR_TYPE,
	POLLS_USER_TYPE,
	POLLS_USER_RECEIVED_TYPE,
} from '../../../constants'

// Fetch all polls
export const fetchAllPolls = payload => ({
	type: POLLS_ALL_TYPE,
	payload,
})

// Dispatch received all polls to reducer
export const dispatchAllPollsReceived = payload => ({
	type: POLLS_ALL_RECEIVED_TYPE,
	payload,
})

// Fetch user polls
export const fetchUserPolls = payload => ({
	type: POLLS_USER_TYPE,
	payload,
})

// Dispatch received user polls to reducer
export const dispatchUserPollsReceived = payload => ({
	type: POLLS_USER_RECEIVED_TYPE,
	payload,
})

// Clear polls state
export const clearPolls = () => ({ type: POLLS_CLEAR_TYPE })
