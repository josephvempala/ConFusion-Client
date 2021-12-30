import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({ dish }) {
    return (
        <div className="card m-3" style={{"max-width": "640px"}}>
            <Link className="removeTextDecor" to={`menu/${dish._id}`}>
                <div className="row no-gutters">
                    <div className="col-md-4 d-flex">
                        <img className="m-1" src={baseUrl + dish.image} alt={dish.name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{dish.name}</h5>
                            <p className="card-text">{dish.description}</p>
                            <p className="card-text"><small className="text-muted">Updated At {new Date(dish.updatedAt).toDateString()}</small></p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

const Menu = (props) => {

    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div key={dish._id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        );
    } else
        return (
            <div className="container">
                <div className="row m-3">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
}

export default Menu;