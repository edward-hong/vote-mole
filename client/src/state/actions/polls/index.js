import {
	POLL_ALL_TYPE,
	POLL_ALL_RECEIVED_TYPE,
	POLL_CLEAR_TYPE,
	POLL_USER_TYPE,
	POLL_USER_RECEIVED_TYPE,
} from '../../../constants'

// Fetch all polls
export const fetchAllPolls = payload => ({
	type: POLL_ALL_TYPE,
	payload,
})

// Dispatch received all polls to reducer
export const dispatchAllPollsReceived = payload => ({
	type: POLL_ALL_RECEIVED_TYPE,
	payload,
})

// Fetch user polls
export const fetchUserPolls = payload => ({
	type: POLL_USER_TYPE,
	payload,
})

// Dispatch received user polls to reducer
export const dispatchUserPollsReceived = payload => ({
	type: POLL_USER_RECEIVED_TYPE,
	payload,
})

// Clear polls state
export const clearPolls = () => ({ type: POLL_CLEAR_TYPE })
