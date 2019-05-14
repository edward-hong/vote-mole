import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

import { dispatchAllPollsReceived } from '../../actions'
import { POLL_ALL_TYPE, POLL_ALL_PATH } from '../../../constants'

// Fetch all polls data and then dispatch to reducer
export const fetchAllPollsEpic = action$ =>
	action$.pipe(
		ofType(POLL_ALL_TYPE),
		mergeMap(() =>
			ajax
				.getJSON(POLL_ALL_PATH)
				.pipe(map(response => dispatchAllPollsReceived(response)))
		)
	)
