import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import StorefrontIcon from '@material-ui/icons/Storefront';
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
      <Card className="c-target">
        <h1>{this.props.name}</h1>
        <p>{this.props.region}</p>
        <a href={this.props.link}>
          <StorefrontIcon fontSize='large' color='primary' />
        </a>
        <p>Deployed at {this.props.deploy}</p>
        <Button className="c-target__delete" color="secondary" onClick={this.buttonClick}>DELETE</Button>
      </Card>
    );
  }
}
  
export default Target;