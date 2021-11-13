import axios from 'axios'
import {returnErrors} from './messages'

import {
    USER_LOADING,
    USER_LOADED, 
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './types'

//Check Token & load user
export const loadUser = () => (dispatch, getState) => {
    //USER LOADING
    dispatch({type: USER_LOADING})

    axios.get('http://localhost:8000/api/auth/user', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
    
}



//Login USER
export const login = (username, password) => (dispatch) => {
    
    //Headers
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    // eslint-disable-next-line
    const body = JSON.stringify({ username, password})
    
    axios.post('http://localhost:8000/api/auth/login', body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: LOGIN_FAIL,
        })
    })
    
}

//LOGOUT USER
export const logout = () => (dispatch, getState) => {

    axios.post('http://localhost:8000/api/auth/logout', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS
        })
    })
    .catch(err => { 
        dispatch(returnErrors(err.response.data, err.response.status))
    })
    
}


//Setup config Token
export const tokenConfig = getState => {
    //Get Token from State
    const token = getState().auth.token

    //Headers
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    //If Token, add to headers config
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}


//Register USER
export const register = ({username, password, email}) => (dispatch) => {
    
    //Headers
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    // eslint-disable-next-line
    const body = JSON.stringify({ username, email, password})
    
    axios.post('http://localhost:8000/api/auth/register', body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: REGISTER_FAIL,
        })
    })
    
}