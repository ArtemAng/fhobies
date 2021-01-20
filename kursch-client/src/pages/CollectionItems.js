import {useEffect, useState, useContext} from 'react';
import CollectionItem from '../components/collectionItems/CollectionItem';
import {useHttp} from '../hooks/http.hook';
import {ItemsContext} from '../context/ItemsContext';
import {CommentsContext} from '../context/CommentsContext';

const CollectionItems = () => {
    const {items, clickedItem} = useContext(ItemsContext);
    const [comments, setComments]= useState([]);
    const {request} = useHttp();


    useEffect(async()=>{
        const data = await request('/api/comments', 'GET');
        setComments(data.comments);
        console.log(data.comments, comments);
    }, [request]);

    return (
        <>
            {items.filter(item=>item.collectionId===clickedItem).map((i, idx) =><CollectionItem likes={i.likes.length} id={i._id} key={idx} title={i.name} tags={i.tags}/>)}
        </>
    );
}
export default CollectionItems;