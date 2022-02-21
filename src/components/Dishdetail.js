import React, {useRef, useState} from 'react';
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
    Row,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm} from 'react-redux-form';
import {Loading} from './Loading';
import {baseUrl} from '../shared/baseUrl';
import {Fade, FadeTransform, Stagger} from 'react-animation-components';
import {connect} from 'react-redux';
import {deleteComment, fetchComments, fetchDishes, fetchFavorites, patchComment, postComment, postFavorite} from '../redux/ActionCreators';

function RenderDish({dish, favorite, postFavorite}) {
    return (
        <div className="col-12 col-md-5 mt-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)',
                }}
            >
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <Button outline color="primary" onClick={() => postFavorite(dish._id)}>
                            {favorite ? <span className="fa fa-heart" /> : <span className="fa fa-heart-o" />}
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

function Comment({comment, auth, patchComment, deleteComment}) {
    let stars = '';
    for (let i = 0; i < comment.rating; i++) {
        stars += '⭐';
    }

    const [showEditControls, setShowEditControls] = useState(false);
    const [editingComment, setEditingComment] = useState(false);
    const inputRef = useRef(null);
    const ratingRef = useRef(null);

    function enableCommentEdit() {
        setShowEditControls(false);
        setEditingComment(true);
    }

    function disableCommentEdit() {
        setShowEditControls(true);
        setEditingComment(false);
    }

    function submitDelete() {
        deleteComment(comment._id);
        disableCommentEdit();
    }

    function submitEdit() {
        if (inputRef.current.value === '') {
            deleteComment(comment._id);
            disableCommentEdit();
            return;
        }
        patchComment(comment._id, ratingRef.current.value, inputRef.current.value);
        disableCommentEdit();
    }

    return (
        <li className="comment px-2" onMouseEnter={() => setShowEditControls(true)} onMouseLeave={() => setShowEditControls(false)}>
            <div className="d-flex">
                <span className="comment-name">
                    {comment.author.firstname} {comment.author.lastname} :
                </span>
                {comment.author.username === auth?.user?.username && !editingComment && showEditControls && (
                    <Fade duration={300} in className="ml-auto">
                        <button onClick={enableCommentEdit} className="removeButtonStyling mr-3">
                            <span className="fa fa-lg fa-pencil-square-o" />
                        </button>
                        <button onClick={submitDelete} className="removeButtonStyling">
                            <span className="fa fa-lg fa-close" />
                        </button>
                    </Fade>
                )}
            </div>
            {!editingComment ? (
                <span>{comment.comment}</span>
            ) : (
                <div className="d-flex">
                    <textarea defaultValue={comment.comment} rows="2" className="flex-fill h-25" ref={inputRef} />
                    <span className="align-self-center m1">Rating</span>
                    <select defaultValue={1} ref={ratingRef} className="px-2" name="rating" id="editrating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button onClick={submitEdit} className="px-2">
                        <span className="fa fa-check" />
                    </button>
                </div>
            )}
            <div className="d-flex py-1">
                <span>{stars}</span>
                <span className="ml-auto">
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    }).format(new Date(Date.parse(comment.updatedAt)))}
                </span>
            </div>
        </li>
    );
}

function RenderComments({comments, postComment, dishId, auth, patchComment, deleteComment}) {
    if (comments === null) return <></>;
    return (
        <div className="col-12 col-md-5 comments-container my-3 p-3">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in>
                    {comments.map((comment) => (
                        <Fade in key={comment._id}>
                            <Comment deleteComment={deleteComment} patchComment={patchComment} auth={auth} comment={comment} />
                        </Fade>
                    ))}
                </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes());
    },
    fetchComments: () => {
        dispatch(fetchComments());
    },
    fetchFavorites: () => dispatch(fetchFavorites()),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    patchComment: (dishId, rating, comment) => dispatch(patchComment(dishId, rating, comment)),
    deleteComment: (dishId) => dispatch(deleteComment(dishId)),
});

function CommentForm({postComment, dishId}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSubmit = (values) => {
        toggleModal();
        postComment(dishId, values.rating, values.comment);
    };

    return (
        <div>
            <Button outline onClick={toggleModal}>
                <span className="fa fa-pencil fa-lg" /> Submit Comment
            </Button>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select defaultValue={1} model=".rating" id="rating" className="form-control">
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
                                <Control.textarea model=".comment" id="comment" rows="6" className="form-control" />
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

const DishDetail = ({dishes, favorites, dishId, errMess, postFavorite, comments, postComment, patchComment, deleteComment, auth}) => {
    const dish = dishes.dishes.filter((x) => x._id === dishId)[0];
    const favourite = favorites.favorites?.dishes.some((dish) => dish._id === dishId);
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
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    } else if (dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={dish} favorite={favourite} postFavorite={postFavorite} />
                    <RenderComments
                        comments={comments.comments.filter((x) => x.dish === dishId)}
                        postComment={postComment}
                        dishId={dish._id}
                        auth={auth}
                        patchComment={patchComment}
                        deleteComment={deleteComment}
                    />
                </div>
            </div>
        );
    else return <></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
