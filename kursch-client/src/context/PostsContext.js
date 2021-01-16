import { createContext } from 'react';

export const PostsContext = createContext({
    posts: null,
    setPosts: ()=>{}
});