import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

import {
	dispatchAllPollsReceived,
	dispatchUserPollsReceived,
} from '../../actions'
import {
	POLLS_ALL_TYPE,
	POLLS_ALL_PATH,
	POLLS_USER_TYPE,
	POLLS_GET_USER_PATH,
} from '../../../constants'

// Fetch all polls data and then dispatch to reducer
export const fetchAllPollsEpic = action$ =>
	action$.pipe(
		ofType(POLLS_ALL_TYPE),
		mergeMap(({ payload: { limit, offset } }) =>
			ajax
				.getJSON(`${POLLS_ALL_PATH}?limit=${limit}&offset=${offset}`)
				.pipe(map(response => dispatchAllPollsReceived(response)))
		)
	)

// Fetch user polls data and then dispatch to reducer
export const fetchUserPollsEpic = action$ =>
	action$.pipe(
		ofType(POLLS_USER_TYPE),
		mergeMap(({ payload: { id, limit, offset } }) =>
			ajax
				.getJSON(`${POLLS_GET_USER_PATH}${id}?limit=${limit}&offset=${offset}`)
				.pipe(map(response => dispatchUserPollsReceived(response)))
		)
	)
