import {
    USER_LOADED, 
    USER_LOADING, 
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
}
// eslint-disable-next-line
export default function(state = initialState, action){
    switch (action.type) {  
        case USER_LOADING:
          return {
            ...state,
            isLoading: true
          }
        case USER_LOADED:
          return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload
          }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
          localStorage.removeItem('token')
          return {
            ...state,
            isAuthenticated: false,
            token: null,
            user: null,
            isLoading: false
          }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
          localStorage.setItem('token', action.payload.token)
          return {
            ...state,
            isAuthenticated: true,
            isLoading: false
          }
        default:
          return state
    }
}