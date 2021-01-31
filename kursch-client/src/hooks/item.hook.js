import { useState } from 'react';

export const useItem = () => {
    const [item, setItem] = useState({
        title: '',
        description: '',
        likes: 0,
        comments: '',
        userName: '',
        collectionName: '',
        props: {}
    });

    const editItem = ({ name, value }) => {
        setItem({ ...item, [name]: value })
    };
    const addProps = (value, name) => {
        const {props} = item;
        props[name] = value;
        setItem({ ...item, ...props });
    }
    const likeItem = (arr) => {
        setItem({ ...item, likes: arr.length });
    }
    return { item, editItem, likeItem, addProps }
}