import React from 'react';
import storefront from './storefront.png';
import './Target.css';

class Target extends React.Component {
  constructor(props) {
    super(props);

    this.state = {click: this.props.cb};
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    this.props.cb(this.props.slug);
  }

  render() {
    return (
      <div className="c-target">
        <h1>{this.props.name}</h1>
        <p>{this.props.region}</p>
        <a href={this.props.link}><img className="c-target__icon" src={storefront} alt="storefront icon" /></a>
        <p>Deployed at {this.props.deploy}</p>
        <p className="c-target__delete" onClick={this.buttonClick}>DELETE</p>
      </div>
    );
  }
}
  
export default Target;