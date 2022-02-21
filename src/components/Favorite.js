import React, {useEffect} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Media} from 'reactstrap';
import {Link} from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './Loading';
import {deleteFavorite, fetchFavorites} from '../redux/ActionCreators';
import {connect} from 'react-redux';

function RenderMenuItem({dish, deleteFavorite}) {
    return (
        <Media tag="li">
            <Media left middle>
                <Media height="200px" width="200px" object src={baseUrl + dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{dish.name}</Media>
                <p>{dish.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
                    <span className="fa fa-times" />
                </Button>
            </Media>
        </Media>
    );
}

const mapDispatchToProps = (dispatch) => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
    fetchFavorites: () => dispatch(fetchFavorites()),
});

const mapStateToProps = (state) => ({
    favorites: state.favorites,
});

const Favorites = ({fetchFavorites, deleteFavorite, favorites}) => {
    useEffect(() => {
        if (!favorites.favorites) fetchFavorites();
    }, [fetchFavorites, favorites.favorites]);

    if (favorites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (favorites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{favorites.errMess}</h4>
                </div>
            </div>
        );
    } else if (favorites.favorites) {
        const favoriteItems = favorites.favorites.dishes.map((dish) => {
            return (
                <div key={dish._id} className="col-12 mb-3">
                    <RenderMenuItem dish={dish} deleteFavorite={deleteFavorite} />
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>My Favorites</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>My Favorites</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {favoriteItems.length > 0 ? (
                        <Media list>{favoriteItems}</Media>
                    ) : (
                        <div className="col-3 col-sm-12 mt-3 mb-3">
                            <h3>You have no favourites</h3>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <h4>You have no favorites</h4>
                </div>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
