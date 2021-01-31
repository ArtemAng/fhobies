import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../context/SocketContext';
import { useContext, useEffect , useState } from 'react';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginLeft: '2%',
        minWidth: 150,
        width: '49%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: 20,
            marginLeft: 0

        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const CategoriesDropDown = ({ handleChange }) => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState([]);

    const { socket } = useContext(SocketContext);
    useEffect(() => {
        socket.emit('get-categories');
        socket.on('categories', (data)=>{setCategories(data)});
    }, [socket])

    return (
        <FormControl variant='filled' color='secondary' className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Property type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={(e)=>{handleChange(e); setValue(e.target.value)}}
            >
                {categories.map((i, id) => <MenuItem key={id} value={i._id}>{i.name}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
export default CategoriesDropDown;