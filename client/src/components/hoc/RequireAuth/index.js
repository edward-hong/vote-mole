import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { equals } from 'ramda'

import * as actions from '../../../state/actions'
import { HOME_PATH } from '../../../constants'

const RequireAuth = Component => {
	const Authentication = props => {
		useEffect(() => {
			if (equals(props.auth, false)) {
				props.history.push(HOME_PATH)
			}
		}, [props.auth, props.history])

		return <Component {...props} />
	}

	const mapStateToProps = ({ auth }) => ({ auth })

	return connect(
		mapStateToProps,
		actions
	)(Authentication)
}

export default RequireAuth
