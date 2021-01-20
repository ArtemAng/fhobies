import { Avatar, Button, Divider, Input, Typography } from '@material-ui/core';
import React from 'react';
import testImage from '../images/tlou2.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: '10px 0px',
        // maxHeight: 700
    },
    flexItem: {
        marginRight: 20
    },
})

const Comment = ({text}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Avatar className={classes.flexItem} alt='user avatar' src={testImage} />
            <div>
                <Typography variant='h6' component='h6'>
                    nickname
            </Typography>
                <Typography component='p'>
                   {text}
            </Typography>
            </div>
        </div>
    );
}
export default Comment;