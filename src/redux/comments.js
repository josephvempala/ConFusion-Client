import * as ActionTypes from './ActionTypes';

export const Comments = (
    state = {
        errMess: null,
        comments: [],
    },
    action,
) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments: []};

        case ActionTypes.ADD_COMMENT: {
            const comment = action.payload;
            return {...state, comments: [...state.comments, comment]};
        }

        case ActionTypes.EDIT_COMMENT: {
            const editedComment = action.payload;
            const newComments = state.comments.filter((x) => x._id !== editedComment._id);
            return {...state, comments: newComments.concat(editedComment)};
        }

        case ActionTypes.DELETE_COMMENT: {
            const commentId = action.payload;
            const newComments = state.comments.filter((x) => x._id !== commentId);
            return {...state, comments: newComments};
        }

        default:
            return state;
    }
};
