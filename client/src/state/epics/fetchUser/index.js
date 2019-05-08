import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

import { fetchUserFulfilled } from '../../actions'
import { FETCH_USER } from '../../../constants'

const fetchUserEpic = action$ =>
	action$.pipe(
		ofType(FETCH_USER),
		mergeMap(() =>
			ajax
				.getJSON(`/auth/current_user`)
				.pipe(map(response => fetchUserFulfilled(response)))
		)
	)

export default fetchUserEpic
