import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    item: {
        border: '2px solid #f44336',
        borderRadius: 5,
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        height: 40,
        margin: 10
    }

}));
const CollectionsListItem = ({ name }) => {
    const classes = useStyles();

    return (
        <div className={classes.item}>
            {name}
        </div>
    );
}
export default CollectionsListItem;