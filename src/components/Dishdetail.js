import React, {useState} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardImg,
    CardImgOverlay,
    CardText,
    CardTitle,
    Col,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm} from 'react-redux-form';
import {Loading} from './Loading';
import {baseUrl} from '../shared/baseUrl';
import {Fade, FadeTransform, Stagger} from 'react-animation-components';
import {connect} from 'react-redux';
import {
    fetchComments,
    fetchDishes,
    postComment,
    fetchFavorites,
    postFavorite
} from '../redux/ActionCreators';

function RenderDish({dish, favorite, postFavorite}) {
    return (
        <div className="col-12 col-md-5 mt-1">
            <FadeTransform in
                           transformProps={{
                               exitTransform: 'scale(0.5) translateY(-50%)'
                           }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name}/>
                    <CardImgOverlay>
                        <Button outline color="primary"
                                onClick={() => favorite ? console.log('Already favorite') : postFavorite(dish._id)}>
                            {favorite ?
                                <span className="fa fa-heart"/>
                                :
                                <span className="fa fa-heart-o"/>
                            }
                        </Button>
                    </CardImgOverlay>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );

}

function RenderComments({comments, postComment, dishId}) {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in key={comment._id}>
                                    <li>
                                        <p>{comment.comment}</p>
                                        <p>{comment.rating} stars</p>
                                        <p>-- {comment.author.firstname} {comment.author.lastname} , {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: '2-digit'
                                        }).format(new Date(Date.parse(comment.updatedAt)))}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
    else
        return (
            <div/>
        );
}

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes())
    },
    fetchComments: () => {
        dispatch(fetchComments())
    },
    fetchFavorites: () => dispatch(fetchFavorites()),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
});

function CommentForm({postComment, dishId}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSubmit = (values) => {
        toggleModal();
        postComment(dishId, values.rating, values.comment);
    }

    return (
        <div>
            <Button outline onClick={toggleModal}><span className="fa fa-pencil fa-lg"/> Submit
                Comment</Button>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment"
                                                    rows="6" className="form-control"/>
                            </Col>
                        </Row>
                        <Button type="submit" className="bg-primary">
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    );
}

const DishDetail = ({dishes, favorites, dishId, errMess, postFavorite, comments, postComment}) => {
    const dish = dishes.dishes.filter(x => x._id === dishId)[0];
    const favourite = favorites.favorites?.dishes.some((dish) => dish._id === dishId)
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
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    } else if (dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={dish} favorite={favourite} postFavorite={postFavorite}/>
                    <RenderComments comments={comments.comments.filter(x=>x.dish === dishId)}
                                    postComment={postComment}
                                    dishId={dish._id}/>
                </div>
            </div>
        );
    else
        return (
            <React.Fragment/>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);