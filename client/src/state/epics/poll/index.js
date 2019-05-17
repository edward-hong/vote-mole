import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { equals, is } from 'ramda'

import {
	dispatchPollReceived,
	dispatchUpdatedPollReceived,
	dispatchVotePollError,
} from '../../actions'
import {
	POLL_INFO_TYPE,
	POLL_INFO_BRANCH_PATH,
	POLL_VOTE_TYPE,
	POLL_VOTE_PATH,
} from '../../../constants'

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

// Update poll and then dispatch updated poll data to reducer

export const votePollEpic = action$ =>
	action$.pipe(
		ofType(POLL_VOTE_TYPE),
		mergeMap(({ payload: { values, poll, alert } }) =>
			ajax({
				url: POLL_VOTE_PATH,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: { ...values, id: poll._id },
			}).pipe(
				map(({ response, status }) => {
					if (equals(status, 200)) {
						if (is(Object, response)) {
							return dispatchUpdatedPollReceived(response)
						} else {
							const errorMessage = "You've already voted on this poll"
							alert.error(errorMessage)
							return dispatchVotePollError(errorMessage)
						}
					} else if (equals(status, 304)) {
						const errorMessage =
							'Vote failed: Custom option is the same as a predefined option'
						alert.error(errorMessage)
						return dispatchVotePollError(errorMessage)
					}
				}),
				catchError(error => of(error))
			)
		)
	)
