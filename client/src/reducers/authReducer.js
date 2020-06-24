import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    EMAIL_VALIDATING,
    EMAIL_VALID,
    EMAIL_INVALID,
    RESEND_CODE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loadingUser: false,
    validatingEmail: false,
    validEmail: false,
    isResent: false,
    email: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loadingUser: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loadingUser: false
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loadingUser: false
            };

        case EMAIL_VALIDATING:
            return {
                ...state,
                validatingEmail: true
            }

        case EMAIL_INVALID:
            return {
                ...state,
                validatingEmail: false
            }
        default:
            return state
    }
}