import axios from 'axios'

import { createMessage, returnErrors } from './messages'

import {tokenConfig} from './auth'

import {GET_LEADS, DELETE_LEAD, ADD_LEAD} from './types'

//For GET_LEADS
export const getLeads = () => (dispatch, getState) => {
    axios.get('http://localhost:8000/api/leads/', tokenConfig(getState))
    .then(res => {
        //console.log(res.data)
        dispatch({
            type: GET_LEADS,
            payload: res.data,
        })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//To DELETE_LEADS
export const deleteLeads = (id) => (dispatch, getState) => {
    axios.delete(`http://localhost:8000/api/leads/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch(
            createMessage({
                deleteLeads: 'Lead Deleted'
        }))
        dispatch({
            type: DELETE_LEAD,
            payload: id
        })
    })
    .catch(err => console.log(err))
}

//For ADD_LEADS
export const addLeads = (lead) => (dispatch, getState) => {
    axios.post('http://localhost:8000/api/leads/', lead, tokenConfig(getState))
    .then(res => {
        //console.log(res.data)
        dispatch(
            createMessage({
                addLeads: 'Lead Added'
        }))
        dispatch({
            type: ADD_LEAD,
            payload: res.data,
        })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}