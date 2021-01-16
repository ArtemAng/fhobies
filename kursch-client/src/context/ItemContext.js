import { createContext } from 'react';

export const ItemContext = createContext({
    item: null,
    editItem: ()=>{},
});