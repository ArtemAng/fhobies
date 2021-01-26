import { useState } from 'react';
import { useHttp } from './http.hook';

export const useCategories = () => {
    const [categories, setCategoriesList] = useState([]);

    const addCategory = (value) => {
        setCategoriesList([...categories, value])
    };
    const { request } = useHttp();

    const removeCategory = async (id) => {
        try {

            const serverData = await request('/api/categories/removecategory', 'POST', { categoryId: id });
            setCategoriesList(serverData.categories);
        } catch (e) {}

    }
    const setCategories = (value) => setCategoriesList([...value]);

    return { categories, removeCategory, setCategories }
}