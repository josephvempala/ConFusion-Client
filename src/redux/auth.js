import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
    isLoading: false,
    isRegisterLoading: false,
    registerErrMess: null,
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.creds
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                token: action.token
            };
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            };
        case ActionTypes.REGISTER_REQUEST:
            return {
                ...state,
                isRegisterLoading:true,
            }
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isRegisterLoading:false,
                registerErrMess:null
            }
        case ActionTypes.REGISTER_FAILURE:
            return {
                ...state,
                isRegisterLoading:false,
                registerErrMess: action.message
            }
        default:
            return state
    }
}