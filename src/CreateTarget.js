import React from 'react';
import './CreateTarget.css';

function CreateTarget(props) {
    return (
      <div className="c-createTarget">
        <h1>New Target</h1>
        <input type="text" name="projectName" placeholder="Project Name" />
        <input type="text" name="projectSlug" placeholder="Project Slug" />
        <button type="button" value="Create" onClick={props.cb}>Create</button>
      </div>
    );
  }
  
  export default CreateTarget;