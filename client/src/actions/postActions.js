import axios from 'axios';
import {
    POST_SUCCESS,
    POST_FAIL,
    ADD_IMAGES,
    ADD_VIDEOS,
    REMOVE_FILE,
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const imageLimit = 10;
export const videoLimit = 2;


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

export const addImage = images => (dispatch, getState) => {
    let tempImg;
    tempImg = images.length;
    if (getState().post.imageNum + tempImg > imageLimit) {
        dispatch(returnErrors({ msg: `Picking too many images, Only ${imageLimit} images are allowd.` }, {}, 'IMAGE_EXCEED'));
    }

    if (getState().post.imageNum + tempImg <= imageLimit) {
        dispatch({
            type: ADD_IMAGES,
            payload: {
                currentImages: tempImg,
                images: [...images].map(element =>
                    ({
                        type: element.type.split("/")[0],
                        source: URL.createObjectURL(element)
                    })
                )
            }
        });
    }
};

export const addVideo = videos => (dispatch, getState) => {
    let tempVideo;
    tempVideo = videos.length;
    if (getState().post.videoNum + tempVideo > videoLimit) {
        dispatch(returnErrors({ msg: `Picking too many videos, Only ${videoLimit} videos are allowd.` }, {}, 'VIDEO_EXCEED'));
    }

    if (getState().post.videoNum + tempVideo <= videoLimit) {
        dispatch({
            type: ADD_VIDEOS,
            payload: {
                currentVideos: tempVideo,
                videos: [...videos].map(element =>
                    ({
                        type: element.type.split("/")[0],
                        source: URL.createObjectURL(element)
                    })
                )
            }
        });
    }
};

export const removeFile = file => dispatch => {
    dispatch({
        type: REMOVE_FILE,
        payload: { file }
    });
};
