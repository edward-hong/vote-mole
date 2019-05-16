import {
	POLLS_ALL_RECEIVED_TYPE,
	POLLS_CLEAR_TYPE,
	POLLS_USER_RECEIVED_TYPE,
} from '../../../constants'

const polls = (state = null, { type, payload }) => {
	switch (type) {
		// Pass data for all or user polls into global state
		case POLLS_ALL_RECEIVED_TYPE:
		case POLLS_USER_RECEIVED_TYPE:
			return payload
		// Clear state
		case POLLS_CLEAR_TYPE:
			return null
		default:
			return state
	}
}

export default polls
