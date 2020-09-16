import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import StorefrontIcon from '@material-ui/icons/Storefront';
//import EditTarget from './EditTarget.js';
import './Target.css';
import './EditTarget.css';

const Target = (props) => {
  //console.log(props)

  const [edit, setEdit] = useState(false)
  const [targetName, setTargetName] = useState(props.name);
  const [targetSlug, setTargetSlug] = useState(props.slug);
  const [externalHostname, setHostName] = useState(props.external_hostname || '');
  const [externalDomain, setDomain] = useState(props.external_domain || '');
  const [ipWhitelist, setIpWhitelist] = useState(props.whitelisted_ips || '');
  const [proxyConfigs, setProxyConfigs] = useState(props.proxy_config || '');
  const [targetRegion, setTargetRegion] = useState(props.region);

  function updateFields() {
    setEdit(false)
    setTargetName(props.name)
    setTargetSlug(props.slug)
    setHostName(props.external_hostname || '');
    setDomain(props.external_domain || '')
    setIpWhitelist(props.whitelisted_ips || '')
    setProxyConfigs(props.proxy_config || '')
    setTargetRegion(props.region)
  }

  useEffect(updateFields, [props]);

  const updateButtonClick = () => {
    //console.log(`${targetName}, ${targetSlug}, ${externalHostname}, ${externalDomain}, ${ipWhitelist}, ${proxyConfigs}, ${targetRegion}`)
    if (targetName.length > 0) {
        props.cb('update', targetName, targetSlug, externalHostname, externalDomain, ipWhitelist, proxyConfigs, targetRegion);
        setTargetName('');
        setTargetSlug('');
        setHostName('');
        setDomain('');
        setIpWhitelist('');
        setProxyConfigs('');
        setTargetRegion('us-east-2')
    }
}

  const deleteButtonClick = () => {
    props.cb('delete', props.slug);
  };

  if (edit) {
    return (
      <Card className="c-editTarget">
        <h1>{targetName}</h1>
        <Input type="text" name="targetName" value={targetName} placeholder="Target Name" 
            onChange={(e) => setTargetName(e.target.value)} />
        <Input readOnly type="text" name="targetSlug" value={targetSlug} />
        <Input type="text" name="external_hostname" value={externalHostname} placeholder="External Hostname" 
            onChange={(e) => setHostName(e.target.value)} />
        <Input type="text" name="external_domain" value={externalDomain} placeholder="External Domain" 
            onChange={(e) => setDomain(e.target.value)} />
        <Input type="text" name="ip_whitelist" value={ipWhitelist} placeholder="IP Whitelist" 
            onChange={(e) => setIpWhitelist(e.target.value)} />
        <Input type="text" name="proxy_configs" value={proxyConfigs} placeholder="Proxy Configs" 
            onChange={(e) => setProxyConfigs(e.target.value)} />
        <Select name="targetRegion" id="targetRegion" value={targetRegion}
            onChange={(e) => setTargetRegion(e.target.value)}>
            <MenuItem value="us-east-1" selected>US East (N. Virginia)</MenuItem>
            <MenuItem value="us-east-2">US East (Ohio)</MenuItem>
            <MenuItem value="us-west-1">US West (N. California)</MenuItem>
            <MenuItem value="us-west-2">US West (Oregon)</MenuItem>
            <MenuItem value="ap-south-1">Asia Pacific (Mumbai)</MenuItem>
            <MenuItem value="ap-northeast-2">Asia Pacific (Seoul)</MenuItem>
            <MenuItem value="ap-southeast-1">Asia Pacific (Singapore)</MenuItem>
            <MenuItem value="ap-southeast-2">Asia Pacific (Sydney)</MenuItem>
            <MenuItem value="ap-northeast-1">Asia Pacific (Tokyo)</MenuItem>
            <MenuItem value="ca-central-1">Canada (Central)</MenuItem>
            <MenuItem value="eu-central-1">EU (Frankfurt)</MenuItem>
            <MenuItem value="eu-west-1">EU (Ireland)</MenuItem>
            <MenuItem value="eu-west-2">EU (London)</MenuItem>
            <MenuItem value="eu-west-3">EU (Paris)</MenuItem>
        </Select>
        <Button value="Cancel" onClick={() => setEdit(false)}>Cancel</Button>
        <Button value="Edit" onClick={updateButtonClick}>Save Changes</Button>
      </Card>
    )
  }

  return (
      <Card className="c-target">
        <h1>{props.name}</h1>
        <p>{props.region}</p>
        <a href={props.link}>
          <StorefrontIcon fontSize='large' color='primary' />
        </a>
        <p>Deployed at {props.deploy}</p>
        <Button className="c-target__edit" color="secondary" onClick={() => setEdit(true)}>EDIT</Button>
        <Button className="c-target__delete" color="secondary" onClick={deleteButtonClick}>DELETE</Button>
      </Card>
  );
}

export default Target;