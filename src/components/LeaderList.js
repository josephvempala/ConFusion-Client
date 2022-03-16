import React, {useState} from 'react';
import {Media} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './Loading';
import {Fade, Stagger} from 'react-animation-components';
import useImageUpload from './ImageUpload';

function Leader({leader, deleteLeader, auth}) {

    const [showClose, setShowClose] = useState(false);

    function handleDelete() {
        deleteLeader(leader._id);
    }

    return (
        <Media tag="li">
            <Media left middle>
                <Media style={{height: 150, width: 100}} object src={baseUrl + leader.image} alt={leader.name}/>
            </Media>
            <Media body className="ml-5 clearfix" onMouseEnter={() => setShowClose(true)}
                onMouseLeave={() => setShowClose(false)}>
                {auth.admin && showClose &&
                    <Fade in duration={200}>
                        <span onClick={handleDelete} style={{cursor: 'pointer'}}
                            className="fa text-white fa-close float-right bg-danger rounded-lg p-2"/>
                    </Fade>
                }
                <Media heading>{leader.name}</Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </Media>
        </Media>
    );
}

function AddLeader({postLeader}) {
    const [ImageUpload, file, resetImage] = useImageUpload();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [designation, setDesignation] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        postLeader(name, description, designation, file);
    }

    function reset() {
        resetImage();
        setDesignation('');
        setName('');
        setDescription('');
    }

    return (
        <Media tag="li">
            <Media left middle>
                <ImageUpload className="media-object" style={{height: 150, width: 100}}/>
            </Media>
            <Media body className="ml-5">
                <form className="form-group clearfix" onSubmit={handleSubmit}>
                    <span onClick={reset} style={{cursor: 'pointer'}}
                        className="fa text-white fa-close float-right bg-danger rounded-lg p-2"/>
                    <Media heading>Name</Media>
                    <input value={name} onChange={(e) => setName(e.target.value)} name="name" className="form-control"
                        type="text"/>
                    <p>Designation</p>
                    <input value={designation} onChange={(e) => setDesignation(e.target.value)} name="designation"
                        className="form-control" type="text"/>
                    <p>Description</p>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} name="description"
                        className="form-control" type="text"/>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </Media>
        </Media>
    );
}

export function LeaderList({leaders, auth, postLeader, deleteLeader}) {
    const leadersList = leaders.leaders.map((leader) => {
        return (
            <Fade in key={leader._id}>
                <div className="col-12 my-3">
                    <Leader auth={auth} deleteLeader={deleteLeader} leader={leader}/>
                </div>
            </Fade>
        );
    });

    if (leaders.isLoading) {
        return <Loading/>;
    } else if (leaders.errMess) {
        return (
            <div className="col-12">
                <h4>{leaders.errMess}</h4>
            </div>
        );
    } else {
        return (
            <div>
                <Media list>
                    <Stagger in>{leadersList}</Stagger>
                    {auth.admin &&
                        <Stagger in><AddLeader postLeader={postLeader}/></Stagger>
                    }
                </Media>
            </div>
        );
    }
}
