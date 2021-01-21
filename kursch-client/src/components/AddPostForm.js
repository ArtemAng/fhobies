import {
    Paper,
    Button,
    TextField,
    ThemeProvider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useState } from 'react';
import { ItemContext } from '../context/ItemContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import FormControll from '../components/FormControll';
import { CollectionsContext } from '../context/CollectionContext';

const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        '& .MuiInputBase-input': {
            color: 'white',
            borderColor: 'white',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
    inputs: {
        marginBottom: 20,

    }

}));

const AddPostForm = ({image}) => {
    const classes = useStyles();
    const { item, editItem } = useContext(ItemContext);
    const { request, error, clearError } = useHttp();
    const message = useMessage();
    const { collections } = useContext(CollectionsContext);
    const {userId} = JSON.parse(localStorage.getItem('userData'));

    const titleChangeHandler = (e) => editItem(e.target);
    const descriptionChangeHandler = (e) => editItem(e.target);

    const submitHandler = async () => {
        try {
            const data = await request('/api/posts/addPost', 'POST', { ...item, userId, image });
            message(data.message)
        } catch (e) { }
    }
    return (
        <Paper className={classes.form}>
            <TextField
                label="Item name"
                color='secondary'
                variant='filled'
                className={classes.inputs}
                onChange={titleChangeHandler}
                name='title'
            />
            <FormControll datas={collections} onChanged={(e)=> editItem(e)} />
            <TextField
                label="Item description"
                fullWidth
                multiline
                rows={6}
                color='secondary'
                name='description'
                className={classes.inputs}
                variant="outlined"
                onChange={descriptionChangeHandler}
            />
            <Button
                variant='outlined'
                color='secondary'
                onClick={submitHandler}
            >
                Submit
            </Button>
        </Paper>
    );
}
export default AddPostForm;