import {
    Paper,
    Button,
    TextField,
    ThemeProvider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useState } from 'react';
import { ItemContext } from '../context/ItemContext';

const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main
    },
    inputs: {
        marginBottom: 20,
        borderColor: theme.palette.primary.contrastText,
    }

}));

const AddPostForm = () => {
    const classes = useStyles();
    const item = useContext(ItemContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const titleChangeHandler = (e) => {
        item.title = e.target.value
        console.log(item, 'handle');
        setTitle(e.target.value);
    }
    const descriptionChangeHandler = (e) => setDescription(e.target.value);

    const submitHandler = () => {
        console.log(item, 'handle');
    }
    return (
        <Paper className={classes.form}>
            <TextField
                label="Item name"
                color='inherit'
                variant='filled'
                className={classes.inputs}
                onChange={titleChangeHandler}
            />
            <TextField
                label="Item description"
                fullWidth
                multiline
                rows={6}
                color='secondary'
                className={classes.inputs}
                variant="outlined"
                onChange={descriptionChangeHandler}
            />
            <Button variant='outlined' color='secondary' >
                Submit
            </Button>
        </Paper>
    );
}
export default AddPostForm;