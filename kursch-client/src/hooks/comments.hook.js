import { useState, useCallback } from 'react';

export const useComments = () => {
    const [сommentsCollection, setCommentsCollection] = useState([]);

    const setComments = (comments) => {
        setCommentsCollection([...comments])
    };

    const removeComment = ( id ) => {
        console.log(id, 'removeComment comment.hook.js');
        // setItem({ ...item, likes: arr.length });
    }
    return { setComments, removeComment, comments: сommentsCollection }
}