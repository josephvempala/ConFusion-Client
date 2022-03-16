import {fetchFeedback} from "../redux/ActionCreators";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import {Loading} from "./Loading";

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

    if (!feedbacks) return <h1> You have no Feedback</h1>;
    else if (feedbacks.isLoading) return <Loading/>;
    else
        return (
            <div className="d-flex flex-column">
                {feedbacks.feedbacks.map}
            </div>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);