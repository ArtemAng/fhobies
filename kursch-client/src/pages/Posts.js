import { useState, useEffect, useCallback, useContext } from 'react';
import Post from '../components/Post';
import { useHttp } from '../hooks/http.hook';
import { useAuth } from '../hooks/auth.hook';
import { CommentsContext } from '../context/CommentsContext';
import { useComments } from '../hooks/comments.hook';
import { SocketContext } from '../context/SocketContext';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const { request } = useHttp();
    const { token, userId } = useAuth();
    const { comments, setComments } = useComments();
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.emit('get-collections');
        socket.on('collections', data => {
            setPosts(data)
        })
    }, [socket, setPosts]);

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