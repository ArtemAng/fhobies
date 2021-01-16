import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useItem } from '../hooks/item.hook';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'inline-block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function ControlledOpenSelect({ title, datas, onChanged=()=>{} }) {
    const classes = useStyles();
    const [collectionName, setCollectionName] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const {editItem} = useItem();

    const handleChange = (event) => {
        setCollectionName(event.target.value);
        //onChanged(datas[event.target.value - 1].title);
        onChanged(event.target);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                name={'collectionName'}
                onClose={handleClose}
                onOpen={handleOpen}
                value={collectionName}
                onChange={handleChange}
            >
                {
                    datas.map((item,id) => {
                        return (
                            <MenuItem key={id} value={item}>{item}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    );
}