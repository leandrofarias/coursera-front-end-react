import * as ActionTypes from './ActionTypes';

const initialState = { errorMessage: null, comments: [] };

export const Comments = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errorMessage: null, comments: action.payload };

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errorMessage: action.payload, comments: [] };

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();

            return { ...state, comments: state.comments.concat(comment) };

        default:
            return state;
    }
};