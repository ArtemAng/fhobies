import { Avatar, Button, Input } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import testImage from '../images/tlou2.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useHttp } from '../hooks/http.hook';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: 10,
        marginTop: 20
    },
    flexItem: {
        marginRight: 20
    },
    textField: {
        width: 300
    }
})

const CommentSender = ({ postId }) => {

    const { request } = useHttp();
    const [text, setText] = useState('');
    const { token, userId } = JSON.parse(localStorage.getItem('userData'));
    const sendComment = useCallback(async () => {
        console.log(postId);
        await request('/api/comments/addcomment', 'POST', { text, userId, itemIdx: postId }, { Authorization: `Bearer ${token}` });

    })

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Avatar className={classes.flexItem} alt='user avatar' src={testImage} />
            <TextField onChange={(e) => setText(e.target.value)} className={classes.textField} placeholder='Commentary...' />
            <Button onClick={sendComment} >
                <SendIcon />
            </Button>
        </div>
    );
}
export default CommentSender;