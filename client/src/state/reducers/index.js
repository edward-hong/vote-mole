import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './auth'
import polls from './polls'
import poll from './poll'

const rootReducer = combineReducers({ auth, form, polls, poll })

export default rootReducer
