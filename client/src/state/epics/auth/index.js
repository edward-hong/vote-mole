import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

import { dispatchUserReceived } from '../../actions'
import {
	AUTH_FETCH_USER_TYPE,
	AUTH_CURRENT_USER_PATH,
} from '../../../constants'

// Fetch for user info and then dispatch to reducer
export const fetchUserEpic = action$ =>
	action$.pipe(
		ofType(AUTH_FETCH_USER_TYPE),
		mergeMap(() =>
			ajax
				.getJSON(AUTH_CURRENT_USER_PATH)
				.pipe(map(response => dispatchUserReceived(response)))
		)
	)
