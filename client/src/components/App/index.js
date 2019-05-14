import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Home from '../Home'
import Poll from '../Poll'
import Navigation from '../Navigation'
import Footer from '../Footer'
import { fetchUser } from '../../state/actions'
import { HOME_PATH, POLL_PATH } from '../../constants'

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
				<Footer />
			</Wrapper>
		</BrowserRouter>
	)
}

export default connect(
	null,
	{ fetchUser }
)(App)
