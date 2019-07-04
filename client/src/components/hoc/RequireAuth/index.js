import React, { useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { equals } from 'ramda'

import { HOME_PATH } from '../../../constants'

const RequireAuth = Component => {
	const Authentication = props => {
		const auth = useSelector(({ auth }) => auth, shallowEqual)

		useEffect(() => {
			if (equals(auth, false)) {
				props.history.push(HOME_PATH)
			}
		}, [auth, props.history])

		return auth && <Component {...props} />
	}

	return Authentication
}

export default RequireAuth
