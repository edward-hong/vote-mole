import { POLL_ALL_RECEIVED_TYPE } from '../../../constants'

const auth = (state = null, { type, payload }) => {
	switch (type) {
		// Pass data for all polls into global state
		case POLL_ALL_RECEIVED_TYPE:
			return payload || false
		default:
			return state
	}
}

export default auth
