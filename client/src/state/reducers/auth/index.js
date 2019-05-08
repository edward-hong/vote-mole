import { FETCH_USER_FULFILLED } from '../../../constants'

const auth = (state = null, { type, payload }) => {
	switch (type) {
		case FETCH_USER_FULFILLED:
			return payload || false
		default:
			return state
	}
}

export default auth
