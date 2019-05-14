import { AUTH_FETCH_USER_RECEIVED_TYPE } from '../../../constants'

const auth = (state = null, { type, payload }) => {
	switch (type) {
		// Pass logged in user info into global state
		case AUTH_FETCH_USER_RECEIVED_TYPE:
			return payload || false
		default:
			return state
	}
}

export default auth
