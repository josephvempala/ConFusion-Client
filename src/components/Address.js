import React from 'react';

export const Address = () => {
    return (
        <>
            <p className="card-title">Our Address</p>
            <address>
                80, Vignan Nagar
                <br />
                3rd Cross
                <br />
                Bangalore-560075
                <br />
                <i className="fa fa-phone fa-lg" />: +91 1234 5678
                <br />
                <i className="fa fa-fax fa-lg" />: +912 8765 4321
                <br />
                <i className="fa fa-envelope fa-lg" />:{' '}
                <a className="removeTextDecor" href="mailto:RistoranteDiUdupi@food.net">
                    RistoranteDiUdupi@food.net
                </a>
            </address>
        </>
    );
};
