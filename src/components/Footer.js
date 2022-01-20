import React from 'react';
import {Link} from 'react-router-dom';
import { Address } from './Address';

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link className="removeTextDecor" to="/home">Home</Link></li>
                            <li><Link className="removeTextDecor" to="/aboutus">About</Link></li>
                            <li><Link className="removeTextDecor" to="/menu">Menu</Link></li>
                            <li><Link className="removeTextDecor" to="/contactus">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <Address/>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <button className="btn btn-social-icon btn-google" href="http://google.com/+"><i
    className="fa fa-google-plus"/></button>
                            <button className="btn btn-social-icon btn-facebook"
                               href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"/></button>
                            <button className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i
    className="fa fa-linkedin"/></button>
                            <button className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i
    className="fa fa-twitter"/></button>
                            <button className="btn btn-social-icon btn-google" href="http://youtube.com/"><i
    className="fa fa-youtube"/></button>
                            <button className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"/></button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2021 Ristorante Di Udupi</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;