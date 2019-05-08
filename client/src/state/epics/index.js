import { combineEpics } from 'redux-observable'

import fetchUser from './fetchUser'

const rootEpic = combineEpics(fetchUser)

export default rootEpic
