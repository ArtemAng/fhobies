import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      marginLeft: '2%',
      minWidth: 150,
      width: '49%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginLeft: 0

    },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const ComboBox = ({value, handleChange}) => {
    const classes = useStyles();

    return (
        <FormControl variant='filled' color='secondary' className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Property type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={handleChange}
            >
                <MenuItem value={'date'}>Date</MenuItem>
                <MenuItem value={'multiline'}>Multiline</MenuItem>
                <MenuItem value={'checkBox'}>Check box</MenuItem>
                <MenuItem value={'textField'}>Text field</MenuItem>
            </Select>
        </FormControl>
    );
}
export default ComboBox;