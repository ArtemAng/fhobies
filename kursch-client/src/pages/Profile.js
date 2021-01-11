import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AddPostForm from '../components/AddPostForm';
import { ItemContext } from '../context/ItemContext';
import { useContext, useEffect } from 'react';
import dropImage from '../images/drop.png';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 10,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    imageDropper: {
        height: 250,
        marginBottom: 10,
        textAlign: 'center',
        marginRight: 5
        // backgroundImage: `url('../images/drop.png')`
    }
}));

const Profile = () => {
    const classes = useStyles();
    const item = useContext(ItemContext);

    useEffect(()=>{
        console.log(item, 'effect')
    }, [item])

    return (
        <ItemContext.Provider value={item}>
            <Grid container justify='center' className={classes.root}>
                <Grid item xs={12} sm={3} className={classes.imageDropper}>
                    <Paper className={classes.imageDropper}>
                        {/* <img src={dropImage}/> */}
                    drop your image here
                </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AddPostForm />
                </Grid>
            </Grid>
        </ItemContext.Provider>
    );
}
export default Profile;