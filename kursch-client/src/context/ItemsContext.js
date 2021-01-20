import { createContext } from 'react';

export const ItemsContext = createContext({
    items: [],
    setItems: ()=>{},
    clickedItem: null,
    setCurrentId: ()=>{}
});