import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './auth'
import polls from './polls'

const rootReducer = combineReducers({ auth, form, polls })

export default rootReducer
