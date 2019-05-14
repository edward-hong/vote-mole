import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './auth'
import poll from './poll'

const rootReducer = combineReducers({ auth, form, poll })

export default rootReducer
