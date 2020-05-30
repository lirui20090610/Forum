import {
    POST_SUCCESS,
    POST_FAIL,
    ADD_IMAGES,
    ADD_VIDEOS,
    REMOVE_FILE,
} from '../actions/types';


export const imageLimit = 10;
export const videoLimit = 2;
const initialState = {
    token: localStorage.getItem('token'),
    isPosted: null,
    userPost: null,
    files: [],
    imageNum: 0,
    videoNum: 0,
    imageFull: false,
    videoFull: false,
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

        case ADD_IMAGES:
            if (state.imageNum + action.payload.currentImages === imageLimit) {
                return {
                    ...state,
                    imageNum: state.imageNum + action.payload.currentImages,
                    files: [...state.files, ...action.payload.images],
                    imageFull: true
                }
            }
            return {
                ...state,
                imageNum: state.imageNum + action.payload.currentImages,
                files: [...state.files, ...action.payload.images]
            }



        case ADD_VIDEOS:
            if (state.videoNum + action.payload.currentVideos === videoLimit) {
                return {
                    ...state,
                    videoNum: state.videoNum + action.payload.currentVideos,
                    files: [...state.files, ...action.payload.videos],
                    videoFull: true
                }
            }
            return {
                ...state,
                videoNum: state.videoNum + action.payload.currentVideos,
                files: [...state.files, ...action.payload.videos]
            }

        case REMOVE_FILE:
            console.log(action.payload);
            if (action.payload.file.type.includes('image')) {
                if (state.imageFull) {
                    return {
                        ...state,
                        files: state.files.filter(file => file !== action.payload.file),
                        imageNum: state.imageNum - 1,
                        imageFull: false
                    }
                }
                return {
                    ...state,
                    files: state.files.filter(file => file !== action.payload.file),
                    imageNum: state.imageNum - 1,
                }
            } else if (action.payload.file.type.includes('video')) {
                if (state.videoFull) {
                    return {
                        ...state,
                        files: state.files.filter(file => file !== action.payload.file),
                        videoNum: state.videoNum - 1,
                        videoFull: false
                    }
                }
                return {
                    ...state,
                    files: state.files.filter(file => file !== action.payload.file),
                    videoNum: state.videoNum - 1,
                }
            }

        default:
            return state;
    }
}