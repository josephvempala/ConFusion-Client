import {fetchFeedback} from "../redux/ActionCreators";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import {Loading} from "./Loading";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";

const mapStateToProps = (state) => ({
    feedbacks: state.feedbacks
});

const mapDispatchToProps = (dispatch) => ({
    fetchFeedbacks: () => dispatch(fetchFeedback()),
});

function Feedback({feedbacks, fetchFeedbacks}) {

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const messages = feedbacks.feedbacks.map(x => (
        <div key={x._id} className="col-12 card">
            <span>Name: {x.firstname} {x.lastname}</span>
            <span>Email: {x.email}</span>
            <span>Telephone: {x.telnum}</span>
            <span>Wishes to be contacted: {x.agree ? 'Yes' : 'No'}</span>
            <span>Preferred contact medium: {x.contactType}</span>
            <span>Message: {x.message}</span>
            <span>Date: {new Date(x.updatedAt).toDateString()}</span>
        </div>
    ));

    if (!feedbacks) return <h1> You have no Feedback</h1>;
    else if (feedbacks.isLoading) return <Loading/>;
    else if (feedbacks.errMess) return <h1>{feedbacks.errMess}</h1>;
    else
        return (
            <div className="container d-flex flex-column">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Feedback</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    {messages}
                </div>
            </div>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);