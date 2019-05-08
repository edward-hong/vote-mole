import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

ReactDOM.render(<App />, document.getElementById('root'))

if (process.env.NODE_ENV !== 'production') {
	if (module.hot) {
		module.hot.accept('./components/App', () => {
			ReactDOM.render(<App />, document.querySelector('#root'))
		})
	}
}
