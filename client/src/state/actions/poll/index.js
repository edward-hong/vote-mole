import {
	POLL_INFO_TYPE,
	POLL_INFO_RECEIVED_TYPE,
	POLL_CLEAR_TYPE,
	POLL_VOTE_TYPE,
	POLL_VOTE_RECEIVED_TYPE,
	POLL_VOTE_ERROR_TYPE,
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

// Vote on poll
export const votePoll = payload => ({
	type: POLL_VOTE_TYPE,
	payload,
})

export const dispatchVotePollError = payload => ({
	type: POLL_VOTE_ERROR_TYPE,
	payload,
})

// Dispatch updated poll data to reducer
export const dispatchUpdatedPollReceived = payload => ({
	type: POLL_VOTE_RECEIVED_TYPE,
	payload,
})
