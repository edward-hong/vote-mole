import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

import { dispatchPollReceived } from '../../actions'
import { POLL_INFO_TYPE, POLL_INFO_BRANCH_PATH } from '../../../constants'

// Fetch poll data and the dispatch to reducer
export const fetchPollEpic = action$ =>
	action$.pipe(
		ofType(POLL_INFO_TYPE),
		mergeMap(({ payload }) =>
			ajax
				.getJSON(`${POLL_INFO_BRANCH_PATH}${payload}`)
				.pipe(map(response => dispatchPollReceived(response)))
		)
	)
