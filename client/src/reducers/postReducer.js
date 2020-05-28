import { POST_SUCCESS, POST_FAIL } from '../actions/types';
const initialState = {
    token: localStorage.getItem('token'),
    isUploaded: null,
    userPost: null,
}

export default function (state = initialState, action) {
    switch (action.type) {

        case POST_SUCCESS:
            return {
                ...state,
                isUploaded: true,
                userPost: action.payload
            }

        case POST_FAIL:
            return {
                ...state,
                isUploaded: false,
                userPost: null
            }

        default:
            return state;
    }
}