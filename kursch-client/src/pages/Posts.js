import { useState, useEffect, useCallback } from 'react';
import Post from '../components/Post';
import { useHttp } from '../hooks/http.hook';
import { usePosts } from '../hooks/posts.hook';
import { useAuth } from '../hooks/auth.hook';
import { CommentsContext } from '../context/CommentsContext';
import { useComments } from '../hooks/comments.hook';
import { useItems } from '../hooks/items.hook';
import { ItemsContext } from '../context/ItemsContext';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const { request } = useHttp();
    const { token, userId } = useAuth();
    const { comments, setComments } = useComments();

    useEffect(async () => {
        try {
            const data = await request('/api/posts/', 'GET', null, { Authorization: `Bearer ${token}` });
            // console.log(data.posts, 'posts');
            setPosts(data.posts);
        } catch (error) { }
    }, [request])

    

    useEffect(async () => {
        try {
            const data = await request('/api/comments', 'GET', null);
            setComments(data.comments);
        } catch (error) { }
    }, [request])

    const like = useCallback(async (idPost) => {
        try {
            const data = await request('/api/posts/like', 'POST', { userId, idPost }, { Authorization: `Bearer ${token}` })
        }
        catch (e) { }
    })
    return (
            <CommentsContext.Provider value={{ comments, setComments }}>
                {posts.reverse().map((i, id) => <Post id={i._id} postIdx={id} likes={i.likes} like={() => like(id)} key={id} nickName={i.userName} title={i.title} description={i.description}></Post>)}
            </CommentsContext.Provider>

    );
}
export default Posts;