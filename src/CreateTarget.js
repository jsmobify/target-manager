import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import './CreateTarget.css';

const CreateTarget = (props) => {
    const [targetName, setTargetName] = useState('');
    const [targetSlug, setTargetSlug] = useState('');

    const buttonClick = () => {
        if (targetName.length > 0 && targetSlug.length > 0) {
            props.cb(targetName, targetSlug);
            setTargetName('');
            setTargetSlug('');
        }
    }

    return (
        <Card className="c-createTarget">
            <h1>New Target</h1>
            <Input type="text" name="targetName" value={targetName} placeholder="Target Name" 
                onChange={(e) => setTargetName(e.target.value)} />
            <Input type="text" name="targetSlug" value={targetSlug} placeholder="Target Slug" 
                onChange={(e) => setTargetSlug(e.target.value)} />
            <Button value="Create" onClick={buttonClick}>Create</Button>
        </Card>
    );
  }
  
  export default CreateTarget;