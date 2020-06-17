import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return errors
export const returnErrors = (msg) => {
    return {
        type: GET_ERRORS,
        payload: msg
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};