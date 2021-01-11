import { Avatar, Button, Input } from '@material-ui/core';
import React from 'react';
import testImage from '../images/tlou2.jpg';
import {makeStyles} from '@material-ui/core/styles';
import {TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
    root:{
        display: 'flex',
        margin: 10,
        marginTop: 20
    },
    flexItem:{
        marginRight: 20
    },
    textField:{
        width: 300
    }
})

const CommentSender = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Avatar className={classes.flexItem} alt='user avatar' src={testImage}/>
            <TextField className={classes.textField} placeholder='Commentary...'/>
            <Button >
                <SendIcon/>
            </Button>
        </div>
    );
}
export default CommentSender;