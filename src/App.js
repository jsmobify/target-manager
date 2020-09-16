import React, { useState, useEffect } from 'react';
import Target from './Target.js';
import CreateTarget from './CreateTarget.js';
import ProjectList from './ProjectList.js';
import './App.css';

const retrieveProjects = () => {
  const URL = `/api/projects/`;
  console.log ('retrieveProjects was called');

  return fetch(URL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data.results;
    })
    .catch(err => console.log(err))
}

const retrieveTargets = (projectSlug) => {
  const URL = `/api/projects/${projectSlug}/target/`;
  //console.log ('retrieveTargets was called');

  return fetch(URL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data.results;
    })
    .catch(err => console.log(err))
} 



const App = () => {
  const [projects, setProjects] = useState([])
  const [projectSlug, setProjectSlug] = useState();
  const [projectName, setProjectName] = useState();
  const [results, setResults] = useState([]);

  function updateProjects() {
    retrieveProjects()
      .then((results) => {
        setProjects(results)
      })
  }

  function updateResults() {
    if (projectSlug) {
      retrieveTargets(projectSlug)
        .then((results) => {
          setResults(results);
      })
    }
  }

  useEffect(updateResults, [projectSlug]);

  function updateProject(slug, name) {
    setProjectName(name)
    setProjectSlug(slug)
  }

  useEffect(updateProjects, [])
  
  const addDefaultTarget = (targetName, targetSlug, externalHostname, externalDomain, ipWhitelist, proxyConfigs, targetRegion) => {
    const URL = `/api/projects/${projectSlug}/target/`;

    let body = {
      name: targetName,
      ssr_whitelisted_ips: ipWhitelist,
      ssr_proxy_configs: proxyConfigs,
      ssr_region: targetRegion,
    };

    Object.assign(body,
      targetSlug.length > 0 ? {slug: targetSlug} : null,
      externalHostname.length > 0 ? {ssr_external_hostname: externalHostname} : null,
      externalDomain.length > 0 ? {ssr_external_domain: externalDomain} : null
    )

    console.log(`I got called with name of ${targetName} and slug of ${targetSlug}!`);
    fetch(URL, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => console.log("create target completed"))
    .then(updateResults);
  }

  const updateTarget = (targetName, targetSlug, externalHostname, externalDomain, ipWhitelist, proxyConfigs) => {
    console.log(`Update target called with ${targetSlug}`);

    const URL = `/api/projects/${projectSlug}/target/${targetSlug}/`;

    let body = {};

    Object.assign(body,
      targetName && targetName.length > 0 ? {name: targetName} : null,
      externalHostname && externalHostname.length > 0 ? {ssr_external_hostname: externalHostname} : null,
      externalDomain && externalDomain.length > 0 ? {ssr_external_domain: externalDomain} : null,
      ipWhitelist && ipWhitelist.length > 0 ? {ssr_whitelisted_ips: ipWhitelist} : null,
      proxyConfigs && proxyConfigs.length > 0 ? {ssr_proxy_configs: proxyConfigs} : null
    )

    console.log(JSON.stringify(body))

    fetch(URL, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => console.log(`Update target ${targetSlug} completed`))
    .then(updateResults);
  }

  const deleteTarget = (targetSlug) => {
    console.log(`Delete target called with ${targetSlug}`);
    let r = window.confirm("Press OK to delete this target");

    if (r === true) {
      const URL = `/api/projects/${projectSlug}/target/${targetSlug}/`
      fetch(URL, {
        method: 'delete'
      })
      .then(() => console.log("delete target completed"))
      .then(updateResults);
    }
  }

  const updateOrDelete = (type, ...args) => {
    console.log(args)
    if (type === 'update') updateTarget(...args);
    else if (type === 'delete') deleteTarget(args);
  }

  return (
    <div className="App"> 
      <ProjectList projects={projects} cb={updateProject} />
      <div className="c-targetList">
        <h1>{projectName}</h1>
        { projectSlug &&
          <CreateTarget cb={addDefaultTarget} />  
        }

        {
          results.map( (el) => {
            const link = `https://cloud.mobify.com/projects/${projectSlug}/publishing/${el.slug}/`;
            const d = new Date(el.current_deploy.bundle.created_at)
            return <Target key={el.name} name={el.name} slug={el.slug}
                      link={link} region={el.ssr_region} 
                      external_hostname={el.ssr_external_hostname}
                      external_domain={el.ssr_external_domain}
                      whitelisted_ips={el.ssr_whitelisted_ips}
                      proxy_config={el.ssr_proxy_config}
                      cb={updateOrDelete}
                      deploy={d.toLocaleString()} />
          })
        }
      </div>
    </div>
  );
}

export default App;