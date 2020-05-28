import axios from 'axios';
import { POST_SUCCESS, POST_FAIL } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


// Uploading users' posts to the server
export const uploadPost = ({ title, userID, content }) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ title, userID, content });

    // Users need jwt in order to be authenticated and then post
    axios.post('/api/post', body, tokenConfig(getState))
        .then(res => dispatch({
            type: POST_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'POST_FAIL'));
            dispatch({
                type: POST_FAIL
            });
        });
};
