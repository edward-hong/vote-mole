import {
	POLL_INFO_TYPE,
	POLL_INFO_RECEIVED_TYPE,
	POLL_CLEAR_TYPE,
} from '../../../constants'

// Fetch poll
export const fetchPoll = payload => ({
	type: POLL_INFO_TYPE,
	payload,
})

// Dispatch received poll data to reducer
export const dispatchPollReceived = payload => ({
	type: POLL_INFO_RECEIVED_TYPE,
	payload,
})

// Action for clearing poll data from state
export const clearPoll = () => ({ type: POLL_CLEAR_TYPE })
