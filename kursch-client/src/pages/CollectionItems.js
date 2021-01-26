import { useEffect, useState, useContext } from 'react';
import CollectionItem from '../components/collectionItems/CollectionItem';
import { useHttp } from '../hooks/http.hook';
import { ItemsContext } from '../context/ItemsContext';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 300,
        margin: 10
    }
}))

const CollectionItems = () => {
    const { items, clickedItem } = useContext(ItemsContext);
    const [comments, setComments] = useState([]);
    const { request } = useHttp();
    const classes = useStyles();

    useEffect(async () => {
        const data = await request('/api/comments', 'GET');
        setComments(data.comments);
        console.log(data.comments, comments);
    }, [request]);

    return (
        <Grid container align="center" maxWidth="md" justify="center" spacing={1}>
            {items.filter((item, idx) => item.collectionId === clickedItem).map((i, idx) => (
                <Grid className={classes.card} item xs={12} sm={6} md={2} spacing={1}>
                    < CollectionItem key={idx} likes={i.likes.length} id={i._id} key={idx} title={i.name} tags={i.tags} />
                </Grid>
            ))}
        </Grid>
    );
}
export default CollectionItems;