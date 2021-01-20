import React, { useCallback } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Popover from '@material-ui/core/Popover';
import { useHttp } from '../hooks/http.hook';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme)=>({
    btn:{
        backgroundColor: theme.palette.primary.backgroundColor,
        borderRadius: 0,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            color: theme.palette.inherit.contrastText
        }
    }
}));

const ToolsMenu = ({ isOpen, openTools, anchorEl, postIdx }) => {
    const classes = useStyles();

    const menuId = 'primary-search-account-menu';
    const { request } = useHttp();

    const deleteHandle = useCallback(async () => {
        await request('/api/posts/deleteItem', 'POST', { postIdx })
    })

    return (
        <Popover
            id={menuId}
            keepMounted
            anchorEl={anchorEl}
            open={isOpen}
            onClose={openTools}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <MenuItem className={classes.btn} variant='contained' color="secondary" onClick={() => { openTools(); deleteHandle(); }}>Delete</MenuItem>
            <MenuItem className={classes.btn} variant='contained' color="secondary" onClick={() => { openTools(); }}>Edit</MenuItem>
        </Popover >
    );
}
export default ToolsMenu;