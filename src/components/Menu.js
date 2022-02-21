import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './Loading';
import {baseUrl} from '../shared/baseUrl';

function RenderMenuItem({dish}) {
    return (
        <div className="card">
            <Link className="removeTextDecor" to={`menu/${dish._id}`}>
                <div className="row" style={{minHeight: '400px'}}>
                    <div className="col-sm-7">
                        <img className="dd-img" src={baseUrl + dish.image} alt={dish.name} />
                    </div>
                    <div className="col-sm-5">
                        <div className="card-body">
                            <h5 className="card-title">{dish.name}</h5>
                            <p className="card-text">{dish.description}</p>
                            <p className="card-text">
                                <small className="text-muted">Updated At {new Date(dish.updatedAt).toDateString()}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

const Menu = ({dishes}) => {
    const menuList = dishes.dishes.map((dish) => {
        return (
            <div key={dish._id} className="col-12 col-md-6 my-3">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    if (dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{dishes.errMess}</h4>
                </div>
            </div>
        );
    } else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">{menuList}</div>
            </div>
        );
};

export default Menu;
