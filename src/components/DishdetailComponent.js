import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import React, { Component } from 'react';

class Dishdetail extends Component{
    renderComments(comments_arr){
        const comment=comments_arr.map((com) =>{
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
    renderDish(dish) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
    
    render(){
        if(this.props.selected!=null){
        return(
            <div className="row">
                    {this.renderDish(this.props.selected)}
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.renderComments(this.props.selected.comments)}
                </div>
            </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}
export default Dishdetail;