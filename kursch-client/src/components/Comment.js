import { Avatar, Typography } from '@material-ui/core';
import {useContext} from 'react';
import testImage from '../images/tlou2.jpg';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {IconButton} from '@material-ui/core';
import {SocketContext} from '../context/SocketContext';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: '10px 0px',
        // maxHeight: 700
    },
    flexItem: {
        marginRight: 20
    },
    content:{
        minWidth: '75%'
    }
})

const Comment = ({ text, commentId }) => {
    const classes = useStyles();
    const {socket } = useContext(SocketContext);
    const deleteHandle = ()=>{
        socket.emit('del-comment', {commentId});
    }
    return (
        <div className={classes.root}>
            <Avatar className={classes.flexItem} alt='user avatar' src={testImage} />
            <div className={classes.content}>
                <Typography variant='h6' component='h6'>
                    nickname
                </Typography>
                <Typography component='p'>
                    {text}
                </Typography>
            </div>
            <IconButton aria-label="settings" onClick={deleteHandle} >
                <HighlightOffIcon />
            </IconButton>
        </div>
    );
}
export default Comment;