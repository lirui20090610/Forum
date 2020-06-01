import axios from 'axios';
import {
    POST_SUCCESS,
    POST_FAIL,
    ADD_FILES,
    REMOVE_FILE,
    GOT_SOURCEID,
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

const imageLimit = 10;
const videoLimit = 2;

const videoSize = 1024000000; // 1GB
const imageSize = 1024000; //1M


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

export const validateFile = () => (dispatch, getState) => {
    console.log("validate file");
    for (var fileIndex = getState().post.validcount; fileIndex < getState().post.files.length; fileIndex++) {

    }
};

// ask server for source id
// export const getSourceID = (files) => (dispatch, getState) => {
//     if (!getState().post.sourceID) {
//         axios.get('/api/post/sourceid', tokenConfig(getState))
//             .then(res =>
//                 dispatch({
//                     type: GOT_SOURCEID,
//                     payload: res.data
//                 }))
//             .catch(err =>
//                 dispatch(returnErrors(err.response.data, err.response.status))
//             );
//         return 'got it';
//     }

// };
export const getSourceID = () => (dispatch, getState) => {
    axios.get('/api/post/sourceid', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GOT_SOURCEID,
                payload: res.data
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}


export const removeFile = file => (dispatch, getState) => {
    let imageNum = getState().post.imageNum;
    let videoNum = getState().post.videoNum;
    if (file.type === 'image') {
        imageNum--;
    } else if (file.type === 'video') {
        videoNum--;
    }

    dispatch({
        type: REMOVE_FILE,
        payload: {
            files: getState().post.files.filter(element => element !== file),
            imageNum,
            videoNum,
            imageFull: imageNum === imageLimit,
            videoFull: videoNum === videoLimit,
        }
    });
};

export const addFiles = files => (dispatch, getState) => {
    let fileLength = files.length;
    let imageNum = getState().post.imageNum;
    let videoNum = getState().post.videoNum;


    if (files[0].type.includes('image')) {
        if (imageNum + fileLength > imageLimit) {
            dispatch(returnErrors({ msg: `Picking too many images, Only ${imageLimit} images are allowd.` }, {}, 'POST_FAIL'));
            return;
        }
        imageNum += fileLength;

    } else if (files[0].type.includes('video')) {
        if (videoNum + fileLength > videoLimit) {
            dispatch(returnErrors({ msg: `Picking too many videos, Only ${videoLimit} videos are allowd.` }, {}, 'POST_FAIL'));
            return;
        }
        videoNum += fileLength;
    }

    dispatch({
        type: ADD_FILES,
        payload: {
            imageNum,
            videoNum,
            files: [...getState().post.files, ...[...files].map(element =>
                ({
                    type: element.type.split("/")[0],
                    size: element.size,
                    progress: 0,
                    source: URL.createObjectURL(element)
                })
            )],
            imageFull: imageNum === imageLimit,
            videoFull: videoNum === videoLimit,
            needValidate: true,
        }
    });

};
