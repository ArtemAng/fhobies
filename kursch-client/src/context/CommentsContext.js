import { createContext } from 'react';

export const CommentsContext = createContext({
    comments: [],
    commetsClickedItem:null,
    setCurrentItemId:()=>{},
    setComments: ()=>{},
});