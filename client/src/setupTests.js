import '@testing-library/react/cleanup-after-each'
import 'jest-dom/extend-expect'
import 'jest-styled-components'

const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })
