import { ADD_LEADERS, LEADERS_LOADING, LEADERS_FAILED } from './ActionTypes';

const initialState = {
    isLoading: true,
    errorMessage: null,
    leaders: []
};

export const Leaders = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LEADERS:
            return {...state, isLoading: false, errorMessage: null, leaders: action.payload };

        case LEADERS_LOADING:
            return {...state, isLoading: true, errorMessage: null, leaders: [] }

        case LEADERS_FAILED:
            return {...state, isLoading: false, errorMessage: action.payload, leaders: [] };

        default:
            return state;
    }
};