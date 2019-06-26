import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { Route, MemoryRouter } from 'react-router-dom'

import RequireAuth from '.'
import renderWithRedux from '../../../utils/test/renderWithRedux'

const Component = () => <div />
const EnhancedComponent = RequireAuth(Component)

const renderTestSequence = ({
	initialEntries,
	initialIndex,
	subject: Subject,
	steps,
}) => {
	const div = document.createElement('div')

	class Assert extends React.Component {
		componentDidMount() {
			this.assert()
		}

		componentDidUpdate() {
			this.assert()
		}

		assert() {
			const nextStep = steps.shift()
			if (nextStep) {
				nextStep({ ...this.props, div })
			} else {
				unmountComponentAtNode(div)
			}
		}

		render() {
			return this.props.children
		}
	}

	class Test extends React.Component {
		render() {
			return (
				<MemoryRouter
					initialIndex={initialIndex}
					initialEntries={initialEntries}>
					<Route
						render={props => (
							<Assert {...props}>
								<Subject />
							</Assert>
						)}
					/>
				</MemoryRouter>
			)
		}
	}

	renderWithRedux(<Test />, { initialState: { auth: false } })
}

const App = () => (
	<div>
		<Route exact path="/" render={() => <div />} />
		<Route path="/protected" component={EnhancedComponent} />
	</div>
)

describe('RequireAuth', () => {
	it("when `auth` is false, user is redirected to homepage '/'", () => {
		renderTestSequence({
			subject: App,
			steps: [
				({ history }) => {
					history.push('/protected')
				},
			],
		})
	})

	it('renders correctly when an object', () => {
		const { container } = renderWithRedux(<EnhancedComponent />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
