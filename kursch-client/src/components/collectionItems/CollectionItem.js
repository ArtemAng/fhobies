import { useState, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import img from '../../images/tlou2.jpg';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CommentsModal from '../CommentsModal';
import { CommentsContext } from '../../context/CommentsContext';
import { useHttp } from '../../hooks/http.hook';
import { SocketContext } from '../../context/SocketContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const CollectionItem = ({ title, tags, id, likes }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { request } = useHttp();
    const { userId } = JSON.parse(localStorage.getItem('userData'));
    const { setCurrentItemId } = useContext(CommentsContext);
    const { socket } = useContext(SocketContext);
    const handleOpen = () => {
        setOpen(!open);
    };

    const likeHandler = useCallback(async () => {
        try {
            await request('/api/collectionitems/like', 'POST', { userId, itemId: id })

        } catch (e) { }
    }, [request]);

    const likeHandle = () => {
        socket.emit('like-item', { userId, itemId: id } );
    }
    const delHandle = () => {
        socket.emit('del-item', { userId, itemId: id } );
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                  </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={delHandle}>
                        <HighlightOffIcon />
                    </IconButton>
                }
                title={title}
                subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                image={img}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {tags}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={likeHandle} aria-label="add to favorites">
                    <FavoriteIcon /> {likes}
                </IconButton>
                <IconButton onClick={() => { handleOpen(); setCurrentItemId(id) }} aria-label="share">
                    <ChatBubbleOutlineIcon />
                </IconButton>
            </CardActions>
            <CommentsModal open={open} handleClose={() => handleOpen()} />

        </Card>
    );
}
export default CollectionItem;