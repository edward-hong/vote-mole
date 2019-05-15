import { POLL_ALL_TYPE, POLL_ALL_RECEIVED_TYPE } from '../../../constants'

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