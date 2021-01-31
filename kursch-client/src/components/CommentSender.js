import { Avatar, Button, Input } from '@material-ui/core';
import React, { useCallback, useState, useContext } from 'react';
import testImage from '../images/tlou2.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useHttp } from '../hooks/http.hook';
import { CommentsContext } from '../context/CommentsContext';
import {SocketContext} from '../context/SocketContext';

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

const CommentSender = () => {

    const { request } = useHttp();
    const [text, setText] = useState('');
    const { commetsClickedItem, addComment } = useContext(CommentsContext);
    const { token, userId } = JSON.parse(localStorage.getItem('userData'));
    const {socket } = useContext(SocketContext);
    const sendComment = useCallback(async () => {
        // await request('/api/comments/addcomment', 'POST', , { Authorization: `Bearer ${token}` });
        socket.emit('add-comment', { text, userId, itemId: commetsClickedItem });
    });

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