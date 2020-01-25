import * as ActionTypes from './ActionTypes';

const initialState = { isLoading: true,
    errorMessage: null,
    promotions:[]
};

export const Promotions = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOS:
            return { ...state, isLoading: false, errorMessage: null, promotions: action.payload };

        case ActionTypes.PROMOS_LOADING:
            return { ...state, isLoading: true, errorMessage: null, promotions: [] }

        case ActionTypes.PROMOS_FAILED:
            return { ...state, isLoading: false, errorMessage: action.payload, promotions: [] };

        default:
            return state;
    }
};