import { FETCH_USER_FULFILLED_TYPE } from '../../../constants'

const auth = (state = null, { type, payload }) => {
	switch (type) {
		case FETCH_USER_FULFILLED_TYPE:
			return payload || false
		default:
			return state
	}
}

export default auth
