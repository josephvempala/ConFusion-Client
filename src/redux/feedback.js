import * as ActionTypes from './ActionTypes';

export const Feedbacks = (
    state = {
        isLoading: true,
        errMess: null,
        feedbacks: null,
    },
    action,
) => {
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACKS:
            return {...state, isLoading: false, errMess: null, feedbacks: action.payload};

        case ActionTypes.FEEDBACKS_LOADING:
            return {...state, isLoading: true, errMess: null, feedbacks: null};

        case ActionTypes.FEEDBACKS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feedbacks: null};

        default:
            return state;
    }
};
