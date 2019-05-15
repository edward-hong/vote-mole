import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

import {
	dispatchAllPollsReceived,
	dispatchUserPollsReceived,
} from '../../actions'
import {
	POLL_ALL_TYPE,
	POLL_ALL_PATH,
	POLL_USER_TYPE,
	POLL_GET_USER_PATH,
} from '../../../constants'

// Fetch all polls data and then dispatch to reducer
export const fetchAllPollsEpic = action$ =>
	action$.pipe(
		ofType(POLL_ALL_TYPE),
		mergeMap(({ payload: { limit, offset } }) =>
			ajax
				.getJSON(`${POLL_ALL_PATH}?limit=${limit}&offset=${offset}`)
				.pipe(map(response => dispatchAllPollsReceived(response)))
		)
	)

export const fetchUserPollsEpic = action$ =>
	action$.pipe(
		ofType(POLL_USER_TYPE),
		mergeMap(({ payload: { id, limit, offset } }) =>
			ajax
				.getJSON(`${POLL_GET_USER_PATH}${id}?limit=${limit}&offset=${offset}`)
				.pipe(map(response => dispatchUserPollsReceived(response)))
		)
	)
