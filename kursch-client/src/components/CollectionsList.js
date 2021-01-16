import {
    Paper,
    Button,
    TextField,
    ThemeProvider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useState } from 'react';
import { CollectionsContext } from '../context/CollectionContext';
import { ItemContext } from '../context/ItemContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import AddCollectionForm from './AddCollectionForm';
import CollectionsListItem from './CollectionsListItem';

const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        height: 450
    },
    inputs: {
        marginBottom: 20,
        backgroundColor: theme.palette.primary.light,
    },
    list:{
        overflowY: 'scroll',
        height: 310,
        maxHeight: 310,
        marginBottom: 5
    },

}));

const CollectionsList = () => {
    const classes = useStyles();
    const {collections} = useContext(CollectionsContext);
    return (
        <Paper className={classes.form}>
            <div className={classes.list}>
                
                {
                    collections.map((i, id)=><CollectionsListItem key={id} name={i} />)
                }

            </div>
            <AddCollectionForm />
        </Paper>
    );
}
export default CollectionsList;