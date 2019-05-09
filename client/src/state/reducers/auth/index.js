import { FETCH_USER_FULFILLED_TYPE } from '../../../constants'

const auth = (state = null, { type, payload }) => {
	switch (type) {
		// Pass logged in user info into global state
		case FETCH_USER_FULFILLED_TYPE:
			return payload || false
		default:
			return state
	}
}

export default auth
