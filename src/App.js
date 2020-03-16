import React from 'react';
import Target from './Target.js';
import './App.css';

// Request data from Mobify's Target API

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    fetch('/api/projects/lancome/target/')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({results: data.results});
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        { 
          this.state.results && 
          <div className="new">+</div>  
        }

        {
          this.state.results &&
          this.state.results.map( (el) => {
            const d = new Date(el.current_deploy.bundle.created_at)
            return <Target key={el.name} name={el.name} region={el.ssr_region} deploy={d.toLocaleString()} />
          })
        }
      </div>
    );
  }
}

export default App;