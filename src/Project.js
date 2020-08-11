import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import './Project.css';

const Project = (props) => {
    const buttonClick = () => {
        console.log(props.slug)
        props.cb(props.slug, props.name);
    };

    return (
        <ListItem className="c-projectTile" onClick={buttonClick}>
            {props.name}
        </ListItem>
    );
}

export default Project;