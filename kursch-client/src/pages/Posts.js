import { useState, useEffect, useCallback } from 'react';
import Post from '../components/Post';
import { useHttp } from '../hooks/http.hook';
import { useAuth } from '../hooks/auth.hook';
import { CommentsContext } from '../context/CommentsContext';
import { useComments } from '../hooks/comments.hook';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const { request } = useHttp();
    const { token, userId } = useAuth();
    const { comments, setComments } = useComments();

    const getData =useCallback( async () => {
        try {
            const data = await request('/api/posts/', 'GET', null, { Authorization: `Bearer ${token}` });
            // console.log(data.posts, 'posts');
            console.log('asda');
            setPosts(data.posts);
        } catch (error) { }
    }, [request])

    const getComments =useCallback( async () => {
        try {
            const data = await request('/api/posts/', 'GET', null, { Authorization: `Bearer ${token}` });
            // console.log(data.posts, 'posts');
            console.log('asda');
            setPosts(data.posts);
        } catch (error) { }
    }, [request])
    useEffect(getData, [getData])

    

    useEffect(async () => {
        try {
            const data = await request('/api/comments', 'GET', null);
            setComments(data.comments);
        } catch (error) { }
    }, [request])

    const like = useCallback(async (idPost) => {
        try {
            const data = await request('/api/posts/like', 'POST', { userId, idPost }, { Authorization: `Bearer ${token}` });
        }
        catch (e) { }
    })
    return (
            <CommentsContext.Provider value={{ comments, setComments }}>
                {posts.map((i, id) => <Post image={i.image} id={i._id} postIdx={id} likes={i.likes} like={() => like(id)} key={id} nickName={i.userName} title={i.title} description={i.description}></Post>)}
            </CommentsContext.Provider>

    );
}
export default Posts;