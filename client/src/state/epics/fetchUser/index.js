import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

import { fetchUserFulfilled } from '../../actions'
import { FETCH_USER_TYPE, AUTH_CURRENT_USER_PATH } from '../../../constants'

// Fetch for user info and then dispatch to reducer
const fetchUserEpic = action$ =>
	action$.pipe(
		ofType(FETCH_USER_TYPE),
		mergeMap(() =>
			ajax
				.getJSON(AUTH_CURRENT_USER_PATH)
				.pipe(map(response => fetchUserFulfilled(response)))
		)
	)

export default fetchUserEpic
