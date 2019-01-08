import { combineReducers } from 'redux';

const initialState = {
    logged: false,
    name: null,
    correctChat: null,
    users: { }
}

const chatReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return {
                ...state,
                logged: true,
                name: action.data.name
            }
        case 'SET_CORRECT_CHAT':
            return {
                ...state,
                correctChat: action.name
            }
        case 'SEND_MESSAGE': 
            return {
                ...state,
                users: action.data
            }
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                users: action.data
            }
        case 'SET_CONNECTED_USERS':
            return {
                ...state,
                users: action.data
            }
        case 'LOGOUT': 
            return {
                ...state,
                logged: false,
                name: null
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({ chatReducer });

export default rootReducer;