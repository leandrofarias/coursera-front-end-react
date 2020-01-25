import * as ActionTypes from './ActionTypes';

const initialState = { errorMessage: null, comments: [] };

export const Comments = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errorMessage: null, comments: action.payload };

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errorMessage: action.payload, comments: [] };

        case ActionTypes.ADD_COMMENT:
            return { ...state, comments: state.comments.concat(action.payload) };

        default:
            return state;
    }
};