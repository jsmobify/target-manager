import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import './Project.css';

const Project = (props) => {
    const buttonClick = () => {
        console.log(props.slug)
        props.cb(props.slug);
    };

    return (
        <ListItem onClick={buttonClick}>
            <h3>{props.name}</h3>
        </ListItem>
    );
}

export default Project;