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
        this.deleteTarget = this.deleteTarget.bind(this);
        this.addDefaultTarget = this.addDefaultTarget.bind(this);
    }

    componentDidMount() {
        this.retrieveTargetList();
    }

    addDefaultTarget(targetName, targetSlug) {
        const URL = `/api/projects/${projectSlug}/target/`;
        const hostname = `https://${projectSlug}-${targetSlug}.mobify-storefront.com`;
        const body = {
            name: targetName,
            slug: targetSlug,
            ssr_external_hostname: hostname,
            ssr_external_domain: 'mobify-storefront.com',
            ssr_region: 'us-east-2'
        };
        console.log(`I got called with name of ${targetName} and slug of ${targetSlug}!`);
        fetch(URL, {
                method: 'post',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(console.log("create target completed"))
            .then(this.retrieveTargetList);
    }

    deleteTarget(targetSlug) {
        console.log(`Delete target called with ${targetSlug}`);
        let r = window.confirm("Press OK to delete this target");

        if (r === true) {
            const URL = `/api/projects/${projectSlug}/target/${targetSlug}/`
            fetch(URL, {
                    method: 'delete'
                }).then(console.log("delete target completed"))
                .then(this.retrieveTargetList);
        }
    }

    retrieveTargetList() {
        const URL = `/api/projects/${projectSlug}/target/`;
        return fetch(URL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    results: data.results
                });
            })
            .catch(err => console.log(err))
    }

    render() {
        return ( <
            div className = "App" > {
                this.state.results &&
                <CreateTarget cb = {this.addDefaultTarget} />
            }

            {
                this.state.results &&
                    this.state.results.map((el) => {
                        const link = `https://cloud.mobify.com/projects/${projectSlug}/publishing/${el.slug}/`;
                        const d = new Date(el.current_deploy.bundle.created_at)
                        return <Target key = {el.name} name = {el.name} slug = {el.slug} 
                                link = {link} region = {el.ssr_region} 
                                cb = {this.deleteTarget} 
                                deploy = {d.toLocaleString()} />
                    })
            } </div>
        );
    }
}

export default App;