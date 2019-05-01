import { DASHBOARD_GET_DATA } from '../actions/types'

const DEFAULT_STATE = {
  secret: '',
}

function dashboard(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case DASHBOARD_GET_DATA:
      return { ...state, secret: action.payload }
    default:
      return state
  }
}

export default dashboard