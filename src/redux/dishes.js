import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: true,
    errorMessage: null,
    dishes: []
};

export const Dishes = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errorMessage: null, dishes: action.payload };

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errorMessage: null, dishes: [] }

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errorMessage: action.payload, dishes: [] };

        default:
            return state;
    }
};