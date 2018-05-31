import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from '../actions/actionTypes'

const initalState = {
  token: null,
  expiration: null
}

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiration: action.expiration
      }
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiration: null
      }
    default:
      return state
  }
}

export default reducer