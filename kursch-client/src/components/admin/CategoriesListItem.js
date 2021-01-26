import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    item: {
        border: '1px solid',
        borderColor: theme.palette.secondary.light,
        padding: 0,
        paddingLeft: 10,
        marginBottom: 5,
        transition: theme.transitions.create(['background-color', 'transform'], {
            duration: theme.transitions.duration.standard,
          }),
        '&:hover':{
            background: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText
        }
    },
    btn:{
        marginLeft:'auto',
        color: '#c2185b'
    }
}));

const CategoriesListItem = ({ title, removeCategory }) => {
    const classes = useStyles();
    return (
        <ListItem className={classes.item} >
            {title} 
            <IconButton onClick={removeCategory} className={classes.btn}>
                <HighlightOffIcon />
            </IconButton>
        </ListItem>
    );
}
export default CategoriesListItem;