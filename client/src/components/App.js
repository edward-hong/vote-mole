import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './containers/Home'
import { HOME_PATH } from '../constants'

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path={HOME_PATH} component={Home} />
		</Switch>
	</BrowserRouter>
)

export default App
