import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';
import fetch from "cross-fetch";

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
});

export const deleteDish = (dishId) => async (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const deleteResponse = await fetch(baseUrl + 'dishes/' + dishId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer
        }
    });
    if (!deleteResponse.ok) {
        alert('failed to delete');
    }
    dispatch(fetchDishes());
};

export const postComment = (dishId, rating, comment) => async (dispatch) => {
    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment,
    };
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const response = await fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
        },
        credentials: 'same-origin',
    });
    if (!response.ok) {
        console.log(`${response.status}:${response.statusText}`);
    }
    dispatch(fetchComments());
};

export const fetchDishes = () => async (dispatch) => {
    dispatch(dishesLoading(true));
    const response = await fetch(baseUrl + 'dishes');
    if (!response.ok) {
        dispatch(dishesFailed(`${response.status}:${response.statusText}`));
    }
    const result = await response.json();
    dispatch(addDishes(result));
};

export const postImage = async (file) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const formData = new FormData();
    formData.append('imageFile', file);
    const imageUploadResponse = await fetch(baseUrl + 'imageUpload', {
        method: 'POST',
        headers: {Authorization: bearer},
        body: formData
    });
    if (!imageUploadResponse.ok) {
        alert("error while trying to upload image");
        return;
    }
    return '/images/' + (await imageUploadResponse.json()).originalname;
};

export const postDish = (file, title, description) => async (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const image = await postImage(file);
    const dishUploadResponse = await fetch(baseUrl + 'dishes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: bearer},
        body: JSON.stringify({
            "name": title,
            "image": image,
            "category": "appetizer",
            "label": "",
            "price": "1.99",
            "featured": false,
            "description": description
        })
    });
    if (!dishUploadResponse.ok) {
        alert("error while trying to upload dish");
    }
    dispatch(fetchDishes());
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess,
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
});

export const fetchComments = () => async (dispatch) => {
    const response = await fetch(baseUrl + 'comments');
    if (!response.ok) {
        dispatch(commentsFailed(`${response.status}:${response.statusText}`));
    }
    const result = await response.json();
    dispatch(addComments(result));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess,
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
});

export const fetchPromos = () => async (dispatch) => {
    dispatch(promosLoading(true));
    const response = await fetch(baseUrl + 'promotions');
    if (!response.ok) {
        dispatch(promosFailed(`${response.status}:${response.statusText}`));
    }
    const result = await response.json();
    dispatch(addPromos(result));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess,
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos,
});

export const fetchLeaders = () => async (dispatch) => {
    dispatch(leadersLoading(true));
    const response = await fetch(baseUrl + 'leaders');
    if (!response.ok) {
        dispatch(leadersFailed(`${response.status}:${response.statusText}`));
    }
    const result = await response.json();
    dispatch(addLeaders(result));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess,
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders,
});

export const postFeedback = (feedback) => () => {
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw error;
            },
        )
        .then((response) => response.json())
        .then((response) => {
            console.log('Feedback', response);
            alert('Thank you for your feedback!\n');
        })
        .catch((error) => {
            console.log('Feedback', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds,
    };
};

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        admin: response.admin
    };
};

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message,
    };
};

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    return response.json().then((resp) => {
                        const error = new Error('Error ' + resp.err.message);
                        error.response = response;
                        throw error;
                    });
                }
            },
            (error) => {
                throw error;
            },
        )
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                localStorage.setItem('admin', response.admin);
                dispatch(fetchFavorites());
                dispatch(receiveLogin(response));
            } else {
                const error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST,
    };
};

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS,
    };
};

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('admin');
    dispatch(favoritesFailed('Error 401: Unauthorized'));
    dispatch(receiveLogout());
};

export const postFavorite = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: 'POST',
        body: JSON.stringify({_id: dishId}),
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw error;
            },
        )
        .then((response) => response.json())
        .then((favorites) => {
            console.log('Favorite Added', favorites);
            dispatch(addFavorites(favorites));
        })
        .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const deleteFavorite = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: 'DELETE',
        headers: {
            Authorization: bearer,
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw error;
            },
        )
        .then((response) => response.json())
        .then((favorites) => {
            console.log('Favorite Deleted', favorites);
            dispatch(addFavorites(favorites));
        })
        .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        headers: {
            Authorization: bearer,
        },
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw new Error(error.message);
            },
        )
        .then((response) => response.json())
        .then((favorites) => dispatch(addFavorites(favorites)))
        .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING,
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess,
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites,
});

export const requestRegister = (creds) => {
    return {
        type: ActionTypes.REGISTER_REQUEST,
        creds,
    };
};

export const receiveRegister = () => {
    return {
        type: ActionTypes.REGISTER_SUCCESS,
    };
};

export const registerError = (message) => {
    return {
        type: ActionTypes.REGISTER_FAILURE,
        message,
    };
};

export const registerUser = (creds) => (dispatch) => {
    dispatch(requestRegister(creds));
    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    return response.json().then((resp) => {
                        const error = new Error('Error ' + resp.err.message);
                        error.response = response;
                        throw error;
                    });
                }
            },
            (error) => {
                throw error;
            },
        )
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                dispatch(receiveRegister());
            } else {
                const error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch((error) => dispatch(registerError(error.message)));
};

export const editComplete = (comment) => ({
    type: ActionTypes.EDIT_COMMENT,
    payload: comment,
});

export const deleteComplete = (commentId) => ({
    type: ActionTypes.DELETE_COMMENT,
    payload: commentId,
});

export const patchComment = (commentId, rating, comment) => async (dispatch) => {
    try {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const body = {
            rating,
            comment,
        };
        const response = await fetch(baseUrl + 'comments/' + commentId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearer,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) return;
        const result = await response.json();
        dispatch(editComplete(result));
    } catch (e) {
        console.log(e);
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    try {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const response = await fetch(baseUrl + 'comments/' + commentId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearer,
            },
        });
        if (!response.ok) return;
        dispatch(deleteComplete(commentId));
    } catch (e) {
        console.log(e);
    }
};

export const postLeader = (name, description, designation, file) => async (dispatch) => {
    try {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const image = await postImage(file);
        const body = JSON.stringify({name, image, designation, abbr: 'None', featured: false, description});
        const response = await fetch(baseUrl + 'leaders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearer,
            },
            body,
        });
        if (!response.ok) return;
        dispatch(fetchLeaders());
    } catch (e) {
        console.log(e);
    }
};

export const deleteLeader = (leaderId) => async (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const deleteResponse = await fetch(baseUrl + 'leaders/' + leaderId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer
        }
    });
    if (!deleteResponse.ok) {
        alert('failed to delete');
    }
    dispatch(fetchLeaders());
};

export const addFeedback = (feedback) => {
    return {
        type: ActionTypes.ADD_FEEDBACKS,
        payload: feedback
    };
};

export const feedbackLoading = () => {
    return {
        type: ActionTypes.FEEDBACKS_LOADING,
    };
};

export const fetchFeedback = () => async (dispatch) => {
    dispatch(feedbackLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const feedbackResponse = await fetch(baseUrl + 'leaders/' + leaderId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer
        }
    });
    if (!feedbackResponse.ok) {
        alert('failed to fetch feedback');
    }
    const feedback = await feedbackResponse.json();
    dispatch(addFeedback(feedback));
};