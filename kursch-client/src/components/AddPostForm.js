import {
    Paper,
    Button,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import { ItemContext } from '../context/ItemContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { CollectionsContext } from '../context/CollectionContext';
import { SocketContext } from '../context/SocketContext';
import CategoriesDropDown from './CategoriesDropDowm';
import {useState} from 'react';

const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(2),

    },
    inputs: {
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    btn: {
        width: 200,
    }
}));

const AddPostForm = ({ image }) => {
    const classes = useStyles();
    const { item, editItem } = useContext(ItemContext);
    const { request, error, clearError } = useHttp();
    const message = useMessage();
    const { collections } = useContext(CollectionsContext);
    const { userId } = JSON.parse(localStorage.getItem('userData'));
    const { socket } = useContext(SocketContext);
    const [categoryId, setCategoryId] = useState('');

    const titleChangeHandler = (e) => editItem(e.target);
    const descriptionChangeHandler = (e) => editItem(e.target);
    const categoryIdChangeHandler = (e) => setCategoryId(e.target.value);

    const submitHandler = async () => {
        try {
            const data = await request('/api/posts/addPost', 'POST', { ...item, userId, image, categoryId });
            await message(data.message);
            socket.emit('add-post');

        } catch (e) { }
    }

    return (
        <Paper className={classes.form}>
            <TextField
                label="Title"
                color='secondary'
                variant='filled'
                className={classes.inputs}
                onChange={titleChangeHandler}
                name='title'
            />
            <CategoriesDropDown  handleChange={categoryIdChangeHandler} />
            <TextField
                label="Description"
                fullWidth
                multiline
                rows={6}
                color='secondary'
                name='description'
                className={classes.inputs}
                variant='filled'
                onChange={descriptionChangeHandler}
            />
            <Button
                variant='contained'
                color='secondary'
                onClick={submitHandler}
                className={classes.btn}
            >
                Add
            </Button>
        </Paper>
    );
}
export default AddPostForm;