import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import ComboBox from './ComboBox';
import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    input: {
        marginBottom: theme.spacing(2),
    },
    form: {
        margin: 5
    },
    propInput: {
        width: '49%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    btnGroup: {
        marginTop: theme.spacing(2)
    }
}))

const AddCategoryForm = ({ addPropsHandle, nameChangeHandle, requestAddHandle }) => {

    const [value, setValue] = useState({ type: '', name: '' });
    const handleChange = (event) => {
        setValue({ ...value, type: event.target.value });
    };
    const handleChangeName = (event) => {
        setValue({ ...value, name: event.target.value });
    };

    const classes = useStyles();
    return (
        <>
            <TextField onChange={nameChangeHandle} fullWidth className={classes.input} color="secondary" label="Category name" variant='filled' />
            <div>
                <TextField className={classes.propInput} onChange={handleChangeName} variant='filled' label="Property name" color='secondary'></TextField>
                <ComboBox value={value.type} handleChange={(e) => handleChange(e)} />
            </div>
            <ButtonGroup className={classes.btnGroup} fullWidth color="secondary" aria-label="outlined primary button group">
                <Button onClick={requestAddHandle} variant='contained' >Add category</Button>
                <Button onClick={() => addPropsHandle(value)} variant='contained'> Add property </Button>

            </ButtonGroup>
        </>
    );
}
export default AddCategoryForm;