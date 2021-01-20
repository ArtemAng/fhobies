import React, { useCallback, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { useHttp } from '../hooks/http.hook';
import { makeStyles } from '@material-ui/styles';
import AddItemModal from '../components/AddItemModal';

const useStyles = makeStyles((theme)=>({
    btn:{
        backgroundColor: theme.palette.primary.backgroundColor,
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

    const [openAddItem, setOpenAddItem] = useState(false);

    const openAddItemHandle = ()=>{
        setOpenAddItem(!openAddItem);
    }
    const deleteHandle = useCallback(async () => {
        await request('/api/posts/deleteItem', 'POST', { postIdx })
    });


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
            <MenuItem className={classes.btn} variant='contained' color="secondary" onClick={() => { openTools(); openAddItemHandle()}}>AddItem</MenuItem>
            <AddItemModal id={postIdx} open={openAddItem} close={()=>{openAddItemHandle()}} />
        </Popover >
    );
}
export default ToolsMenu;