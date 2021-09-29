import { useReducer } from 'react'
import PropTypes from 'prop-types'

export * from './server'

export const buildProvider = (reducer, initialState, Context) => {
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    )
  }

  Provider.propTypes = {
    children: PropTypes.element.isRequired,
  }

  return Provider
}
