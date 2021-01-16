import { useState, useEffect, useCallback } from 'react';
import Post from '../components/Post';
import { useHttp } from '../hooks/http.hook';
import { usePosts } from '../hooks/posts.hook';
import { useAuth } from '../hooks/auth.hook';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const { request } = useHttp();
    const { token, userId } = useAuth();

    useEffect(async () => {
        try {
            const data = await request('/api/posts/', 'GET', null, { Authorization: `Bearer ${token}` });
            console.log(data.posts, 'posts');
            setPosts(data.posts);
        } catch (error) { }
    }, [request])

    const like = useCallback(async (idPost) => {
        const data = await request('/api/posts/like', 'POST', {userId, idPost }, { Authorization: `Bearer ${token}` })
    })

    return (
        <>
            {posts.reverse().map((i, id) => <Post likes={i.likes} like={()=>like(id)} key={id} nickName={i.userName} title={i.title} description={i.description}></Post>)}
        </>
    );
}
export default Posts;