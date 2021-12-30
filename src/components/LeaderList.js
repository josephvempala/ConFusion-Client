import React from 'react';
import { Media } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import {Loading} from './Loading';
import {Fade, Stagger} from 'react-animation-components';

function Leader({ leader }) {
    return (
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + leader.image} alt={leader.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{leader.name}</Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </Media>
        </Media>
    );
}

export function LeaderList(props) {

    const leaders = props.leaders.leaders.map((leader) => {
        return (
            <Fade in key={leader._id}>
                <div className="col-12 mt-2">
                    <Leader leader={leader}/>
                </div>
            </Fade>
        );
    });

    if (props.leaders.isLoading) {
        return (
            <Loading/>
        );
    } else if (props.leaders.errMess) {
        return (
            <div className="col-12">
                <h4>{props.leaders.errMess}</h4>
            </div>
        );
    } else {
        return (
            <div className="m-3">
                <Media list>
                    <Stagger in>
                        {leaders}
                    </Stagger>
                </Media>
            </div>
        );
    }
}