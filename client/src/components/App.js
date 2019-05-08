import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import styled from 'styled-components'

import Home from './containers/Home'
import Navigation from './containers/Navigation'
import { HOME_PATH } from '../constants'

const Wrapper = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
`

const App = () => (
	<BrowserRouter>
		<Wrapper>
			<Navigation />
			<Route exact path={HOME_PATH} component={Home} />
		</Wrapper>
	</BrowserRouter>
)

export default App
