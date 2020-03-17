import React from 'react';
import Target from './Target.js';
import CreateTarget from './CreateTarget.js';
import './App.css';

// Request data from Mobify's Target API
var projectSlug = "jstest";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.retrieveTargetList = this.retrieveTargetList.bind(this);
    this.addDefaultTarget = this.addDefaultTarget.bind(this);
  }

  componentDidMount() {
    this.retrieveTargetList();
  }

  addDefaultTarget() {
    const URL = `/api/projects/${projectSlug}/target/`;
    console.log("I got called!");
  }

  retrieveTargetList() {
    const URL = `/api/projects/${projectSlug}/target/`;
    fetch(URL)
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
          <CreateTarget cb={this.addDefaultTarget} />  
        }

        {
          this.state.results &&
          this.state.results.map( (el) => {
            const link = `https://cloud.mobify.com/projects/${projectSlug}/publishing/${el.slug}/`;
            const d = new Date(el.current_deploy.bundle.created_at)
            return <Target key={el.name} name={el.name} link={link} region={el.ssr_region} deploy={d.toLocaleString()} />
          })
        }
      </div>
    );
  }
}

export default App;