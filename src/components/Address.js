import React from "react"

export const Address = () => {
    return(
    <>
        <h5>Our Address</h5>
        <address>
            80, Vignan Nagar<br/>
            3rd Cross<br/>
            Bangalore-560075<br/>
            <i className="fa fa-phone fa-lg"/>: +91 1234 5678<br/>
            <i className="fa fa-fax fa-lg"/>: +912 8765 4321<br/>
            <i className="fa fa-envelope fa-lg"/>: <a href="mailto:RistoranteDiUdupi@food.net">
            RistoranteDiUdupi@food.net</a>
        </address>
    </>
    );
}