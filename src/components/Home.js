import React, { useEffect } from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Jumbotron} from 'reactstrap';
import {Loading} from './Loading';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform} from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return (
            <Loading/>
        );
    } else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    } else
        return (
            <FadeTransform className="my-3" in
                           transformProps={{
                               exitTransform: 'scale(0.5) translateY(-50%)'
                           }}>
                <Card>
                    <CardImg height="400px" width="400px" style={{"borderRadius":"1em"}} src={baseUrl + item.image} alt={item.name}/>
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
}

function Home(props) {
    useEffect(()=>{
        const Form = document.getElementById('reserveForm');
        if(Form.childNodes.length === 0){
            const Script = document.createElement("script");
            Script.setAttribute('src',"https://checkout.razorpay.com/v1/payment-button.js")
            Script.setAttribute('data-payment_button_id',"pl_Id9dy85qzmg5CX")
            Form.appendChild(Script);
        }
        return;
      },[]);

    return (
        <>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante Di Udupi</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion
                                experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                        <div className="col-12 col-sm-6 d-flex align-items-center">
                        <form className="ml-auto" id='reserveForm'/>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.dish}
                                    isLoading={props.dishesLoading}
                                    errMess={props.dishesErrMess}/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.promotion}
                                    isLoading={props.promosLoading}
                                    errMess={props.promosErrMess}/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={props.leader}
                                    isLoading={props.leaderLoading}
                                    errMess={props.leaderErrMess}/>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Home;