import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {createForms} from 'react-redux-form';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import {favorites} from './favorites';
import {Auth} from './auth';
import thunk from 'redux-thunk';
import {InitialFeedback} from './forms';

export const ConfigureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            auth: Auth,
            favorites,
            ...createForms({
                feedback: InitialFeedback,
            }),
        }),
        composeEnhancers(applyMiddleware(thunk)),
    );
};
