import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Home from '../Home'
import Poll from '../Poll'
import MyPolls from '../MyPolls'
import Navigation from '../Navigation'
import Footer from '../Footer'
import PrivacyPolicy from '../PrivacyPolicy'
import RequireAuth from '../hoc/RequireAuth'
import { fetchUser } from '../../state/actions'
import { HOME_PATH, POLL_PATH, POLLS_USER_PATH, PRIVACY_POLICY_PATH } from '../../constants'

const Wrapper = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
`

const App = ({ fetchUser }) => {
	// Check whether a user is logged in or not
	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	// Set frontend routes with Navigation and Footer appearing in all routes
	return (
		<BrowserRouter>
			<Wrapper>
				<Navigation />
				<Route exact path={HOME_PATH} component={Home} />
				<Route path={POLL_PATH} component={Poll} />
				<Route path={PRIVACY_POLICY_PATH} component={PrivacyPolicy} />
				<Route path={POLLS_USER_PATH} component={RequireAuth(MyPolls)} />
				<Footer />
			</Wrapper>
		</BrowserRouter>
	)
}

export default connect(
	null,
	{ fetchUser }
)(App)
