import {
    Button,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useState } from 'react';
import { CollectionsContext } from '../context/CollectionContext';
import { useHttp } from '../hooks/http.hook';

const useStyles = makeStyles((theme) => ({
    tf: {
        marginTop: 10,
        marginBottom: 10

    },
    btn: {
        height: 55,
        marginLeft: 5
    }

}));

const AddCollectionForm = () => {
    const { addCollection } = useContext(CollectionsContext);
    const classes = useStyles();
    const [collectionName, setCollectionName] = useState('');
    const { request } = useHttp();

    const collectionNameHandle = (e) => setCollectionName(e.target.value);

    const addCollectionHandle = async () => {
        try {
            addCollection(collectionName);
            const user = JSON.parse(localStorage.getItem('userData'));
             await request('/api/collections/addcollection', 'POST', { collectionName, userId: user.userId});
            // message(data.message);
        } catch (e) {}
    }

    return (
        <div>
            <TextField
                variant='outlined'
                label='Collection name'
                name='collectionName'
                color='secondary'
                fullWidth
                className={classes.tf}
                onChange={collectionNameHandle}
            />
            <Button
                variant='outlined'
                fullWidth
                color='secondary'
                onClick={addCollectionHandle}
            >
                Add
            </Button>
        </div>
    );
}
export default AddCollectionForm;