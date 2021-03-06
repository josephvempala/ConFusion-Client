import React from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LeaderList} from './LeaderList';

function About({leaders, postLeader, deleteLeader, auth}) {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr/>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>
                        Started in 2010, Ristorante Di Udupi quickly established itself as a culinary icon par
                        excellence in Bangalore. With its
                        unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from
                        the A-list clientele in
                        Bangalore. Featuring four of the best three-star Michelin chefs in the world, you never know
                        what will arrive on your plate
                        the next time you visit us.
                    </p>
                    <p>
                        The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain
                        started by our CEO, Mr. Peter Pan,
                        that featured for the first time the world&aposs best cuisines in a pan.
                    </p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">22 Dec. 2021</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">Karnataka Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year&aposs Turnover</dt>
                                <dd className="col-6">2,230,342 Rs.</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">30</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because I&aposm not hungry
                                    enough to eat six.</p>
                                <footer className="blockquote-footer">
                                    Yogi Berra,
                                    <cite title="Source Title">The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion
                                        Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <LeaderList leaders={leaders} auth={auth} deleteLeader={deleteLeader} postLeader={postLeader}/>
            </div>
        </div>
    );
}

export default About;
