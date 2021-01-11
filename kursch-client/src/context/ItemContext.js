import { createContext } from 'react';

export const ItemContext = createContext({
    title: '',
    description: '',
    likes: 0,
    comments: '',
    userName: '',
    collectionName: ''
});