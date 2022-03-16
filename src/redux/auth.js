import * as ActionTypes from './ActionTypes';

export const Auth = (
    state = {
        isLoading: false,
        isRegisterLoading: false,
        isAuthenticated: !!localStorage.getItem('token'),
        token: localStorage.getItem('token'),
        user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
        errMess: null,
        admin: (localStorage.getItem('admin') === 'true')
    },
    action,
) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.creds,
                errMess: null,
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                token: action.token,
                admin: action.admin
            };
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message,
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true,
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null,
                admin: null
            };
        case ActionTypes.REGISTER_REQUEST:
            return {
                ...state,
                isRegisterLoading: true,
                errMess: null,
            };
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isRegisterLoading: false,
                registerErrMess: null,
            };
        case ActionTypes.REGISTER_FAILURE:
            return {
                ...state,
                isRegisterLoading: false,
                errMess: action.message,
            };
        default:
            return state;
    }
};
