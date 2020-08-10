import React from 'react';
import List from '@material-ui/core/List';
import Project from './Project.js';
import './ProjectList.css';

const ProjectList = (props) => {
    return (
        <List className="c-projectList">
            {
                props.projects.map((el) => {
                    return (
                        <Project key={el.slug} name={el.name} slug={el.slug} cb={props.cb} />
                    )
                })
            }
        </List>
    )
}

export default ProjectList;