import {
	POLL_INFO_RECEIVED_TYPE,
	POLL_CLEAR_TYPE,
	POLL_VOTE_RECEIVED_TYPE,
	POLL_VOTE_ERROR_TYPE,
} from '../../../constants'

const poll = (state = null, { type, payload }) => {
	switch (type) {
		// Pass data for poll into global state
		case POLL_INFO_RECEIVED_TYPE:
		case POLL_VOTE_RECEIVED_TYPE:
			return payload
		// Add error message to state if there was an error voting on poll
		case POLL_VOTE_ERROR_TYPE:
			return { ...state, error: payload }
		// Clear state
		case POLL_CLEAR_TYPE:
			return null
		default:
			return state
	}
}

export default poll
