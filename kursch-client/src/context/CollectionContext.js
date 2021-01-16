import { createContext } from 'react';

export const CollectionsContext = createContext({
    collections: null,
    addCollection: ()=>{},
    setCollections: ()=>{}
});