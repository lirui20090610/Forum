import {
    POST_SUCCESS,
    POST_FAIL,
    ADD_FILES,
    REMOVE_FILE,
    GOT_SOURCEID
} from '../actions/types';



const initialState = {
    token: localStorage.getItem('token'),
    isPosted: null,
    userPost: null,
    files: [],
    imageNum: 0,
    videoNum: 0,
    imageFull: false,
    videoFull: false,
    sourceID: null,
    needValidate: false,
    validCount: 0,
}

export default function (state = initialState, action) {
    switch (action.type) {

        case POST_SUCCESS:
            return {
                ...state,
                isPosted: true,
                userPost: action.payload
            }

        case POST_FAIL:
            return {
                ...state,
                isPosted: false,
                userPost: null
            }

        case GOT_SOURCEID:
            console.log(action.payload);
            return {
                ...state,
                sourceID: action.payload
            }


        case ADD_FILES:
            console.log(action.payload);
            return {
                ...state,
                imageNum: action.payload.imageNum,
                videoNum: action.payload.videoNum,
                files: action.payload.files,
                imageFull: action.payload.imageFull,
                videoFull: action.payload.videoFull,
                needValidate: action.payload.needValidate,
            }
        case REMOVE_FILE:
            // console.log(action.payload);
            return {
                ...state,
                imageNum: action.payload.imageNum,
                videoNum: action.payload.videoNum,
                files: action.payload.files,
                imageFull: action.payload.imageFull,
                videoFull: action.payload.videoFull
            }


        default: // need this for default case
            return state
    }
}