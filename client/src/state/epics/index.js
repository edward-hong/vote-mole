import { combineEpics } from 'redux-observable'
import { values } from 'ramda'

import * as authEpics from './auth'
import * as pollEpics from './poll'

const rootEpic = combineEpics(...values(authEpics), ...values(pollEpics))

export default rootEpic
