import { combineEpics } from 'redux-observable'
import { values } from 'ramda'

import * as authEpics from './auth'
import * as pollEpics from './polls'

const rootEpic = combineEpics(...values(authEpics), ...values(pollEpics))

export default rootEpic
