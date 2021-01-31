import {
    Paper,
    Button,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ItemContext } from '../context/ItemContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { CollectionsContext } from '../context/CollectionContext';
import { SocketContext } from '../context/SocketContext';
import CategoriesDropDown from './CategoriesDropDowm';
import { useState, useEffect, useContext } from 'react';
import { CategoriesContext } from '../context/Categories';
import Checkbox from '@material-ui/core/Checkbox';

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
    const { item, editItem, addProps } = useContext(ItemContext);
    const { request } = useHttp();
    const message = useMessage();
    const { userId } = JSON.parse(localStorage.getItem('userData'));
    const { socket } = useContext(SocketContext);
    const [categoryId, setCategoryId] = useState('');
    const [categoryProps, setCatProps] = useState([]);
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const titleChangeHandler = (e) => editItem(e.target);
    const descriptionChangeHandler = (e) => editItem(e.target);
    const categoryIdChangeHandler = (e) => {
        setCategoryId(e.target.value);
    }

    const getComponent = (type, name, key) => {
        switch (type) {
            case 'date': return '';
            case 'textField': return <TextField key={key} className={classes.inputs}  onChange={(e) => addProps(e.target.value, name )} color="secondary" name={name} placeholder={name} fullWidth variant='filled' />;
            case 'multiline': return <TextField key={key} className={classes.inputs} onChange={(e) => addProps(e.target.value, name)} color="secondary" multiline name={name} placeholder={name} fullWidth variant='filled' />;
            case 'checkBox': return <div key={key}> <Checkbox checked={item[name]} onChange={(e) => addProps(e.target.checked, name)} inputProps={{ 'aria-label': 'primary checkbox' }} />{name}</div>;
        }
    }

    useEffect(() => {
        socket.emit('get-category-by-id', categoryId);
        socket.on('category-by-id', (data) => setCatProps(data));
    }, [socket, categoryId]);
    // useEffect(() => {
    //     console.log(categoryProps);
    // }, [categoryProps]);


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
            <CategoriesDropDown value={categoryId} handleChange={categoryIdChangeHandler} />
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
            {
                categoryProps.map((i, idx) => getComponent(i.type, i.name, idx))
            }
            <div>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={submitHandler}
                    className={classes.btn}
                >
                    Add
            </Button>
            </div>
        </Paper>
    );
}
export default AddPostForm;