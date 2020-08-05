import React from 'react';
import {Media} from 'reactstrap';

function RenderLeader({leader}){
    return(
        <Media className="d-flex" >
          <Media left top href='#' className="d-flex mr-5 img-thumbnail align-self-center" >
            <Media 
              object
              src={leader.image}
              alt={leader.name}
            />
          </Media>
          <Media body className="d-none d-sm-block mt-5" >
            <Media heading className="mt-0">{leader.name}</Media>
            {leader.designation}
            <br/>
            <br/>
            {leader.description}
          </Media>
        </Media>
    );
}
export default RenderLeader;