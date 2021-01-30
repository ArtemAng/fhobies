import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Divider, } from '@material-ui/core';
import CommentSender from './CommentSender';
import Comment from './Comment';
import { useHttp } from '../hooks/http.hook';
import { CommentsContext } from '../context/CommentsContext';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        alignItems: 'center'
    },
}));

export default function SimpleModal({ postId, open, handleClose }) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const { comments, commetsClickedItem } = useContext(CommentsContext);

    const opened = open || false;
    const body = (
        <Fade in={opened}>
            <div style={modalStyle} className={classes.paper}>
                {/* kostiiiiiiliiiii */}
                {comments.filter(i => i.itemId === commetsClickedItem).map((i, id) => <Comment key={id} text={i.text} />)}
                <Divider />
                <CommentSender />
                <SimpleModal />
            </div>
        </Fade>
    );

    return (

        <Modal
            open={open || false}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            {body}
        </Modal>
    );
}