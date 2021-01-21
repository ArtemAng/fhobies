import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AddPostForm from '../components/AddPostForm';
import { ItemContext } from '../context/ItemContext';
import { useContext, useEffect } from 'react';
import dropImage from '../images/drop.png';
import { useItem } from '../hooks/item.hook';
import { useCollections } from '../hooks/collections.hook';
import CollectionsList from '../components/CollectionsList';
import { CollectionsContext } from '../context/CollectionContext'
import { useHttp } from '../hooks/http.hook';
import Dropzone from '../components/Dropzone';
import {useState} from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 10,
    },
    paper: {
        alignItems: 'center',
        color: theme.palette.text.secondary,
        marginBottom: 10,
        marginRight: 10
    },
    imageDropper: {
        height: 250,
        marginBottom: 10,
        textAlign: 'center',
        marginRight: 5,
        // backgroundImage: `url('../images/drop.png')`
    }
}));

const Profile = () => {
    const classes = useStyles();
    const { item, editItem } = useItem();
    const { collections, addCollection, setCollections } = useCollections();
    const { request } = useHttp();
    const { token, userId } = JSON.parse(localStorage.getItem('userData'));
    const [image, setImage] = useState();
    // useEffect(() => {
    //     console.log(item, '-------------------effect')
    // }, [item, collections]);

    useEffect(async () => {
        try {
            const data = await request('/api/collections/', 'GET', null, { Authorization: `Bearer ${token}` });
            setCollections(data.collections);
        } catch (error) { }
    }, [request])
    return (
        <ItemContext.Provider value={{ item, editItem }}>
            <CollectionsContext.Provider value={{ collections, addCollection, setCollections }}>
                <Grid container justify='center' className={classes.root}>
                    <Grid item xs={12} sm={2} className={classes.imageDropper}>
                        <Paper className={classes.imageDropper}>
                            {/* <img src={dropImage}/> */}
                           <Dropzone setImage ={(img)=>setImage(img)}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.paper}>
                        <AddPostForm image={image}/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <CollectionsList />
                    </Grid>
                </Grid>
            </CollectionsContext.Provider>
        </ItemContext.Provider>
    );
}
export default Profile;