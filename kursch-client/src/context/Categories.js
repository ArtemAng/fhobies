import { createContext } from 'react';

export const CategoriesContext = createContext({
    categories: [],
    addCategory: ()=>{},
    setCategories: ()=>{},
});