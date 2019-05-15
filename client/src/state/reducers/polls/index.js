import {
	POLL_ALL_RECEIVED_TYPE,
	POLL_CLEAR_TYPE,
	POLL_USER_RECEIVED_TYPE,
} from '../../../constants'

const polls = (state = null, { type, payload }) => {
	switch (type) {
		// Pass data for all or user polls into global state
		case POLL_ALL_RECEIVED_TYPE:
		case POLL_USER_RECEIVED_TYPE:
			return payload
		// Clear state
		case POLL_CLEAR_TYPE:
			return null
		default:
			return state
	}
}

export default polls
