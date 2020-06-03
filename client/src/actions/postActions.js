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
// image size restrictions
const imageWidth = 5000;
const imageHeight = 5000;


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
    // for (var fileIndex = getState().post.validcount; fileIndex < getState().post.files.length; fileIndex++) {
    //     switch(getState().post.files[fileIndex].type){
    //         case "image":
    //             if
    //     }
    // }
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
    let validFiles = [];
    let imageNum = getState().post.imageNum;
    let videoNum = getState().post.videoNum;


    if (files[0].type.includes('image')) {
        if (imageNum + fileLength > imageLimit) {
            dispatch(returnErrors({ msg: `Picking too many images, Only ${imageLimit} images are allowd.` }, {}, 'POST_FAIL'));
            return;
        }
        imageNum += fileLength;


        // console.log(uploadImages(files[0]));
        // // console.log(validFiles);
        // [...files].map(image => uploadImages(image, getState().auth.token));
        [...files].map(image => uploadImages(image, dispatch, getState));

    } else if (files[0].type.includes('video')) {
        if (videoNum + fileLength > videoLimit) {
            dispatch(returnErrors({ msg: `Picking too many videos, Only ${videoLimit} videos are allowd.` }, {}, 'POST_FAIL'));
            return;
        }
        videoNum += fileLength;
    }

    // console.log(validFiles);
    // dispatch({
    //     type: ADD_FILES,
    //     payload: {
    //         imageNum,
    //         videoNum,
    //         // files: [...getState().post.files, ...[...files].map(element =>
    //         //     ({
    //         //         type: element.type.split("/")[0],
    //         //         size: element.size,
    //         //         progress: 0,
    //         //         source: URL.createObjectURL(element)
    //         //     })
    //         // )],
    //         imageFull: imageNum === imageLimit,
    //         videoFull: videoNum === videoLimit,
    //         needValidate: true,
    //     }
    // });

};

export const uploadImages = (image, dispatch, getState) => {
    var reader = new FileReader();
    var img = new Image();
    reader.readAsDataURL(image);
    reader.onload = e => {
        img.src = e.target.result;
    };

    img.onload = () => {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var originWidth = img.width;
        var originHeight = img.height;

        var targetWidth = originWidth,
            targetHeight = originHeight;

        if (originWidth > imageWidth || originHeight > imageHeight) {
            if (originWidth / originHeight > imageWidth / imageHeight) {
                targetWidth = imageWidth;
                targetHeight = Math.round(imageWidth * (originHeight / originWidth));
            } else {
                targetHeight = imageHeight;
                targetWidth = Math.round(imageHeight * (originWidth / originHeight));
            }
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        context.clearRect(0, 0, targetWidth, targetHeight);

        context.drawImage(img, 0, 0, targetWidth, targetHeight);


        let data = new FormData();
        const config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted);


            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': getState().auth.token,
            },
        }

        canvas.toBlob((blob) => {
            dispatch({
                type: ADD_FILES,
                payload: {
                    imageNum: getState().post.imageNum++,
                    videoNum: getState().post.videoNum,
                    files: [...getState().post.files, {
                        type: image.type.split("/")[0],
                        progress: 0,
                        source: URL.createObjectURL(blob),
                    }],
                    imageFull: getState().post.imageNum++ === imageLimit,
                    videoFull: getState().post.videoNum === videoLimit,
                }
            });
            data.append('data', blob);
            axios.post('/api/post/upload', data, config)
                .then(res => {
                    console.log(res);
                });

        }, 'image/jpeg', 0.92)



    };

}

