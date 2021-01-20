import { useState, useCallback } from 'react';

export const useItem = () => {
    const [item, setItem] = useState({
        title: '',
        description: '',
        likes: 0,
        comments: '',
        userName: '',
        collectionName: ''
    });

    const editItem = ({ name, value }) => {
        setItem({ ...item, [name]: value })
    };
    const likeItem = ( arr ) => {
        setItem({ ...item, likes: arr.length });
    }
    return { item, editItem, likeItem }
}