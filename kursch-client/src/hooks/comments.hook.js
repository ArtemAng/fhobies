import { useState } from 'react';

export const useComments = () => {
    const [сommentsCollection, setCommentsCollection] = useState([]);
    const [commetsClickedItem, setClickedItem] = useState(null);

    const setComments = (comments) => {
        setCommentsCollection([...comments])
    };

    const setCurrentItemId = (id) => {
        setClickedItem(id);
    }
    const addComment = (comment) => {
        setClickedItem([...сommentsCollection, comment]);
    }
    const removeComment = (id) => {
        console.log(id, 'removeComment comment.hook.js');
        // setItem({ ...item, likes: arr.length });
    }
    return { setComments, removeComment, comments: сommentsCollection, addComment, commetsClickedItem, setCurrentItemId }
}