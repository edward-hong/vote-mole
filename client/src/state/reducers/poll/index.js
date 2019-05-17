import { POLL_INFO_RECEIVED_TYPE, POLL_CLEAR_TYPE } from '../../../constants'

const poll = (state = null, { type, payload }) => {
	switch (type) {
		// Pass data for poll into global state
		case POLL_INFO_RECEIVED_TYPE:
			return payload
		// Clear state
		case POLL_CLEAR_TYPE:
			return null
		default:
			return state
	}
}

export default poll
