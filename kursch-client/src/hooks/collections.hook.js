import { useState } from 'react';

export const useCollections = () => {
    const [collections, setCollection] = useState([]);

    const addCollection = (value) => {
        setCollection([...collections, value])
    };

    const setCollections = (value) => setCollection([...value]);

    return { collections, addCollection, setCollections }
}