import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const required = (val) => val && val.length;
    function RenderComments({comments}){
        const comment=comments.map((com) =>{
            return(
                <ul key={com.id} className="list-unstyled">
                    <li>{com.comment}</li>
                    <br></br>
                    <li>--{com.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</li>
                    <br></br>
                </ul>
            )
        });
        return(comment);
    } 
    function RenderDish({dish}) {
            return(
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
            );
        }
    function DishDetail (props) {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else{
                if(props.dish!=null){
                    return(
                        <div className="container">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>{props.dish.name}</h3>
                                    <hr />
                                </div>                
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-5 m-1">
                                    <RenderDish dish={props.dish} />
                                </div>
                                <div className="col-12 col-md-5 m-1">
                                    <RenderComments comments={props.comments}/>
                                    <CommentForm dishId={props.dish.id} addComment={props.addComment}/>
                                </div>
                            </div>
                            </div>
                        );
                }
                else{
                    return(
                        <div></div>
                    );
                }
            }
        } 
        class CommentForm extends Component{
            constructor(props){
                super(props);
                this.state = {
                    isModalOpen: false
                };
                this.handleSubmit=this.handleSubmit.bind(this);
                this.toggleModal=this.toggleModal.bind(this);
            }
            handleSubmit(values) {
                this.toggleModal();
                this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
                // event.preventDefault();
            }
            toggleModal() {
                this.setState({
                  isModalOpen: !this.state.isModalOpen
                });
            }
            render(){
                return(
                    <React.Fragment>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                            <Col>
                                            <Label htmlFor="ratings">Ratings</Label>
                                                <Control.select model=".rating" name="rating" className="form-control">
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
                                            <Label htmlFor="name">Your Name</Label>
                                                <Control.text model=".name" id="name" name="name" placeholder="Your Name" className="form-control"
                                                    validators={{
                                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}/>
                                                <Errors
                                                className="text-danger"
                                                model=".name"
                                                show="touched"
                                                messages={{
                                                    required: 'Required \n',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                                />
                                            </Col>
                                    </Row>
                                    <Row className="form-group">
                                            <Col>
                                            <Label htmlFor="comment">Comment</Label>
                                                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"
                                                    validators={{
                                                        required
                                                    }}/>
                                                <Errors
                                                className="text-danger"
                                                model=".comment"
                                                show="touched"
                                                messages={{
                                                    required: 'Required'
                                                }}
                                                />
                                            </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </ModalBody>
                        </Modal>
                        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"> Submit Comment</span></Button>
                    </React.Fragment>
                );
            }
        }     
export default DishDetail;