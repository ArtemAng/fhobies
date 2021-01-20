import React, { useState, useEffect, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, Button } from '@material-ui/core';
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

export default function SimpleModal({ id, postComments, postId, open, close, }) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [formData, setFormData] = useState({});
    const { request, message } = useHttp();
    const {token, userId} = JSON.parse(localStorage.getItem('userData'));
    const changeData = (e)=>setFormData({...formData, [e.target.name]: e.target.value});
    const addItem = useCallback(async ()=>{
        try {
            const data = await request('/api/collectionitems/addItem', 'POST', {collectionId: id, ...formData, userId}, {Authorization: 'Bearer ' + token});
            message(data.message);
        } catch (e) {
            
        }
    });

    const opened = open || false;
    const body = (
        <Fade in={opened}>
            <div style={modalStyle} className={classes.paper}>
                {/* kostiiiiiiliiiii */}
                <TextField onChange={changeData} name='name' placeholder='Name' variant='outlined'></TextField>
                <TextField onChange={changeData} name='tags' multiline rows={3} placeholder='Tags' variant='outlined'></TextField>
                <Button onClick={addItem} variant='outlined'>Add</Button>

            </div>
        </Fade>
    );

    return (

        <Modal
            open={open || false}
            onClose={close}
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