import React, {useEffect} from 'react';
import Home from './Home';
import About from './About';
import Menu from './Menu';
import Contact from './Contact';
import DishDetail from './Dishdetail';
import Favorites from './Favorite';
import Header from './Header';
import Footer from './Footer';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    fetchComments,
    fetchDishes,
    fetchLeaders,
    fetchPromos,
    loginUser,
    logoutUser,
    postComment,
    postFavorite,
    postFeedback,
    registerUser
} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ErrorFloater from './ErrorFloater';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes())
    },
    resetFeedbackForm: () => {
        dispatch(actions.reset('feedback'))
    },
    fetchComments: () => {
        dispatch(fetchComments())
    },
    fetchPromos: () => {
        dispatch(fetchPromos())
    },
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    registerUser: (creds) => dispatch(registerUser(creds))
});

function Main(props) {
    const {fetchComments, fetchDishes, fetchPromos, fetchLeaders, fetchFavorites} = props;
    useEffect(()=>{
        fetchDishes();
        fetchComments();
        fetchPromos();
        fetchLeaders();
    },[fetchComments, fetchDishes, fetchPromos, fetchLeaders, fetchFavorites])
        
    const HomePage = () => {
        return (
            <Home dish={props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={props.dishes.isLoading}
                    dishesErrMess={props.dishes.errMess}
                    promotion={props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading={props.promotions.isLoading}
                    promosErrMess={props.promotions.errMess}
                    leader={props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leaderLoading={props.leaders.isLoading}
                    leaderErrMess={props.leaders.errMess}
            />
        );
    }

    const DishWithId = ({match}) => {
        return (
            <DishDetail 
                dishId={match.params.dishId}
            />
        );
    }

    const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
        <Route {...rest} render={(props) => (
                isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: {from: props.location}
                }}/>
        )}/>
    );

    return (
        <div className="full-viewport">
            <ErrorFloater timeout={10000}></ErrorFloater>
            <Header auth={props.auth}
                    loginUser={props.loginUser}
                    logoutUser={props.logoutUser}
                    registerUser={props.registerUser}
            />
            <TransitionGroup>
                <CSSTransition key={props.location.key} classNames="page" timeout={200}>
                    <div className="my-3">
                        <Switch>
                            <Route path="/home" component={HomePage}/>
                            <Route exact path='/aboutus' component={() => <About leaders={props.leaders}/>}/>
                            <Route exact path="/menu" component={() => <Menu dishes={props.dishes}/>}/>
                            <Route path="/menu/:dishId" component={DishWithId}/>
                            <PrivateRoute exact path="/favorites"
                                            component={() => <Favorites/>}
                                            isAuthenticated={props.auth.isAuthenticated}/>
                            <Route exact path="/contactus"
                                    component={() => <Contact resetFeedbackForm={props.resetFeedbackForm}
                                                                postFeedback={props.postFeedback}/>}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </div> 
                </CSSTransition>
            </TransitionGroup>
            <Footer/>
        </div>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
