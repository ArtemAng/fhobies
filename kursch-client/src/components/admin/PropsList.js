import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Divider,
    ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 260,
    },
    content: {
        overflowY: 'scroll',
        height: 145
    }
}))

const PropsList = ({ propsList, removePropHandle }) => {
    const getIcon = prop => {
        switch (prop) {
            case 'date': return <CalendarTodayIcon />
            case 'multiline': return <DescriptionIcon />
            case 'checkBox': return <CheckBoxIcon />
            case 'textField': return <TextFieldsIcon />
            default: return null;
        }
    }
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                title={<Typography variant='h6' align='center' component='h4'>Properties</Typography>}
            />
            <Divider />
            <CardContent className={classes.content} >
                {propsList.map((i, idx) => <ListItem key={idx} onClick={()=>removePropHandle(idx)} button>{getIcon(i.type)}  {i.name}</ListItem>)}
            </CardContent>
            <CardContent >
                <Divider />
            </CardContent>

        </Card>
    );
}
export default PropsList;