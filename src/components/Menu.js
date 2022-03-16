import React, {useState} from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './Loading';
import {baseUrl} from '../shared/baseUrl';
import {Fade} from "react-animation-components";
import useImageUpload from "./ImageUpload";

function AddMenuItem({postDish}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ImageUpload, file, resetImage] = useImageUpload();

    function reset() {
        setTitle('');
        setDescription('');
        resetImage();
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!file || !title || !description) {
            alert("all fields are mandatory");
            return;
        }
        postDish(file, title, description);
    }

    return (
        <div className="card clearfix">
            <div className="row" style={{minHeight: '400px'}}>
                <div className="col-sm-7">
                    <div className="h-100 border">
                        <ImageUpload/>
                    </div>
                </div>
                <div className="col-sm-5">
                    <span onClick={reset} style={{cursor: 'pointer'}}
                        className="fa text-white fa-close float-right bg-danger rounded-lg p-2"/>
                    <div className="card-body">
                        <div className="row">
                            <form className="form-group" onSubmit={onSubmit}>
                                <label>Title</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)}
                                    className="col-12 form-control"
                                    type="text"/>
                                <label>Description</label>
                                <textarea style={{maxHeight: 200}} value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="col-12 form-control"/>
                                <button className="btn btn-primary mt-3" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RenderMenuItem({dish, deleteDish, auth}) {
    const [showClose, setShowClose] = useState(false);
    return (
        <div className="card" onMouseEnter={() => setShowClose(true)}
            onMouseLeave={() => setShowClose(false)}>
            <div className="row" style={{minHeight: '400px'}}>
                <Link className="col-sm-7 d-flex justify-content-center m-0 p-0 removeTextDecor"
                    to={`menu/${dish._id}`}>
                    <img className="dd-img" src={baseUrl + dish.image} alt={dish.name}/>
                </Link>
                <div className="col-sm-5">
                    {showClose && auth.admin &&
                        <Fade in duration={200}>
                            <span onClick={() => deleteDish(dish._id)} style={{cursor: 'pointer'}}
                                className="fa text-white fa-close float-right rounded-lg bg-danger rounded p-2"/>
                        </Fade>
                    }
                    <div className="card-body">
                        <Link className="removeTextDecor" to={`menu/${dish._id}`}>
                            <h5 className="card-title">{dish.name}</h5>
                            <p className="card-text">{dish.description}</p>
                            <p className="card-text">
                                <small className="text-muted">Updated
                                    At {new Date(dish.updatedAt).toDateString()}</small>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Menu = ({dishes, postDish, deleteDish, auth}) => {
    const menuList = dishes.dishes.map((dish) => {
        return (
            <div key={dish._id} className="col-12 col-lg-6 my-3">
                <RenderMenuItem dish={dish} deleteDish={deleteDish} auth={auth}/>
            </div>
        );
    });

    if (dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
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
                        <hr/>
                    </div>
                </div>
                <div className="row">{menuList}
                    {auth.admin === true &&
                        <div className="col-12 col-md-6 my-3">
                            <AddMenuItem postDish={postDish}/>
                        </div>
                    }
                </div>
            </div>
        );
};

export default Menu;
