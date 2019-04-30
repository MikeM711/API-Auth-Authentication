import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN, 
  AUTH_ERROR, 
  COMPONENT_MOUNT } from '../actions/types'

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: '',
  errorMessage: '',
}

function auth(state = DEFAULT_STATE, action) {
  switch(action.type) {
    // step 3 - import the action type and create a case for action type
    case COMPONENT_MOUNT:
      console.log('[AuthReducer] got an COMPONENT_MOUNT action')
      return { ...state, errorMessage: '' }
    case AUTH_SIGN_UP:
      console.log('[AuthReducer] got an AUTH_SIGN_UP action')
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
    case AUTH_SIGN_IN:
      console.log('[AuthReducer] got an AUTH_SIGN_IN action')
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
    case AUTH_SIGN_OUT:
      return { ...state, token: action.payload, isAuthenticated: false, errorMessage: ''}
    case AUTH_ERROR:
      console.log('[AuthReducer] got an AUTH_ERROR action')
      return { ...state, errorMessage: action.payload}
    default:
      return state
  }
}

export default auth