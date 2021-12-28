import React, {Component} from 'react';
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
    deleteFavorite,
    fetchComments,
    fetchDishes,
    fetchFavorites,
    fetchLeaders,
    fetchPromos,
    loginUser,
    logoutUser,
    postComment,
    postFavorite,
    postFeedback
} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        favorites: state.favorites,
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
    fetchFavorites: () => dispatch(fetchFavorites()),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchFavorites();
    }

    render() {

        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                      dishesLoading={this.props.dishes.isLoading}
                      dishesErrMess={this.props.dishes.errMess}
                      promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                      promosLoading={this.props.promotions.isLoading}
                      promosErrMess={this.props.promotions.errMess}
                      leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                      leaderLoading={this.props.leaders.isLoading}
                      leaderErrMess={this.props.leaders.errMess}
                />
            );
        }

        const DishWithId = ({match}) => {
            return (
                this.props.auth.isAuthenticated
                    ?
                    <DishDetail 
                        dishId={match.params.dishId}
                    />
                    :
                    <DishDetail 
                        dishId={match.params.dishId}
                    />
            );
        }

        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: {from: props.location}
                    }}/>
            )}/>
        );

        return (
            <div>
                <Header auth={this.props.auth}
                        loginUser={this.props.loginUser}
                        logoutUser={this.props.logoutUser}
                />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage}/>
                            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders}/>}/>
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                            <Route path="/menu/:dishId" component={DishWithId}/>
                            <PrivateRoute exact path="/favorites"
                                          component={() => <Favorites favorites={this.props.favorites}
                                                                      deleteFavorite={this.props.deleteFavorite}/>}/>
                            <Route exact path="/contactus"
                                   component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                                                             postFeedback={this.props.postFeedback}/>}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
