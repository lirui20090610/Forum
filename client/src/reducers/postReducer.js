import {
    POST,
    POST_SUCCESS,
    POST_FAIL,
    END_POST,
    GET_SOURCEID,
    GET_SOURCEID_SUCCESS,
    GET_SOURCEID_FAIL,
    ADD_FILES,
    REMOVE_FILE,
    UPDATE_PROGRESS
} from '../actions/types';



const initialState = {
    token: localStorage.getItem('token'),
    isPosting: false,
    isPosted: false,
    userPost: null,
    files: [],
    fileNum: 0,
    imageNum: 0,
    videoNum: 0,
    imageFull: false,
    videoFull: false,
    sourceID: null,
    loadingSourceID: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case POST:
            return {
                ...state,
                isPosting: true
            }
        case POST_SUCCESS:
            return {
                ...state,
                isPosting: false,
                isPosted: true,
                userPost: action.payload
            }

        case POST_FAIL:
            return {
                ...state,
                isPosting: false,
                isPosted: false,
                userPost: null
            }

        // the current post is posted, initialize the state    
        case END_POST:
            return {
                isPosting: false,
                isPosted: false,
                userPost: null,
                files: [],
                fileNum: 0,
                imageNum: 0,
                videoNum: 0,
                imageFull: false,
                videoFull: false,
                sourceID: null,
                loadingSourceID: false,
            }
        case GET_SOURCEID:
            return {
                ...state,
                loadingSourceID: true
            }
        case GET_SOURCEID_SUCCESS:
            return {
                ...state,
                loadingSourceID: false,
                sourceID: action.payload
            }
        case GET_SOURCEID_FAIL:
            return {
                ...state,
                loadingSourceID: false,
            }


        case ADD_FILES:
            console.log(action.payload);
            return {
                ...state,
                imageNum: action.payload.imageNum,
                videoNum: action.payload.videoNum,
                fileNum: action.payload.fileNum,
                files: action.payload.files,
                imageFull: action.payload.imageFull,
                videoFull: action.payload.videoFull,
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

        case UPDATE_PROGRESS:
            // console.log(action.payload);
            return {
                ...state,
                files: action.payload.files,
            }
        default: // need this for default case
            return state
    }
}