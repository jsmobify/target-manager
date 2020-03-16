import React from 'react';
import storefront from './storefront.png';
import './Target.css';

function Target(props) {
    return (
      <div className="c-target">
        <h1>{props.name}</h1>
        <p>{props.region}</p>
        <img className="c-target__icon" src={storefront} alt="storefront icon" />
        <p>Deployed at {props.deploy}</p>
      </div>
    );
  }
  
  export default Target;