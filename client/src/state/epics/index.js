import { combineEpics } from 'redux-observable'
import { values } from 'ramda'

import * as authEpics from './auth'
import * as pollsEpics from './polls'
import * as pollEpics from './poll'

const rootEpic = combineEpics(
	...values(authEpics),
	...values(pollsEpics),
	...values(pollEpics)
)

export default rootEpic
