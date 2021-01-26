import { useState} from 'react';

export const useItems = () => {
    const [items, setItems] = useState([]);
    const [clickedItem, setClickedItem] = useState(null)
    const setCollectionItems = (itemsCollection) => {
        setItems([...itemsCollection]);
    };
    
    const setCurrentId =(id)=>{
        setClickedItem(id);
    }
    
    return { items, setItems: setCollectionItems, clickedItem, setCurrentId }
}