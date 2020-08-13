import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import StorefrontIcon from '@material-ui/icons/Storefront';
import './Target.css';

const Target = (props) => {

  const updateButtonClick = () => {
    props.cb('update', props.slug);
  };

  const deleteButtonClick = () => {
    props.cb('delete', props.slug);
  };

  return (
    <Card className="c-target">
      <h1>{props.name}</h1>
      <p>{props.region}</p>
      <a href={props.link}>
        <StorefrontIcon fontSize='large' color='primary' />
      </a>
      <p>Deployed at {props.deploy}</p>
      <Button className="c-target__edit" color="secondary" onClick={updateButtonClick}>EDIT</Button>
      <Button className="c-target__delete" color="secondary" onClick={deleteButtonClick}>DELETE</Button>
    </Card>
  );
}

export default Target;