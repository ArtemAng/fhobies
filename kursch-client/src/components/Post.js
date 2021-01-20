import { useState } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
    Avatar,
    Divider,
    Button
} from '@material-ui/core';
import testImg from '../images/as.jpg';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CommentsContext } from '../context/CommentsContext';
import { useEffect, useContext } from 'react';
import ToolsMenu from '../components/ToolsMenu';
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { useCallback } from 'react';
import { ItemsContext } from '../context/ItemsContext';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 600,
        margin: '0 auto',
        marginTop: 20,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main
    },
    postHeader: {
        display: 'flex',
        '& > *': {
            margin: 1,
        },
    },
    avatar: {
        width: 30,
        height: 30
    },
    nickName: {
        // marginTop: 2,
        height: 20,
        marginLeft: 12
    },
    moreBtn: {
        marginLeft: 'auto',
        // borderRadius: '50%',
        // width: 20
    },
}))

const Post = ({ id, nickName, description, title, like, likes, postIdx }) => {

    const classes = useStyles();
    const [postComments, setPostComments] = useState([]);
    const { comments, setComments } = useContext(CommentsContext);
    const [toolsOpen, setToolsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { request } = useHttp();
    const {setCurrentId} = useContext(ItemsContext)
    useEffect(() => {
        console.log(comments, 'comments post');
        const filteredComments = comments.map(i => i._id === id ? i : null).filter(i => i !== null);
        setPostComments(filteredComments);
        // console.log(comments.map(i=>i._id===id? i:null));
    }, [comments, setPostComments])

    const openTools = (e) => {
        setToolsOpen(!toolsOpen);
        !toolsOpen ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    }

    

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent className={classes.postHeader}>
                    <Avatar
                        className={classes.avatar}
                        alt='userAvatar'
                        src={testImg} />
                    <Typography className={classes.nickName} gutterBottom variant="h6" component="h1">
                        {nickName}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActionArea onClick={()=>setCurrentId(id)}>
                <Link to='/collectionItems'>
                    <CardMedia
                        component='img'
                        alt='collection item photo'
                        height='300'
                        image={testImg} />
                </Link>
            </CardActionArea>

            <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                    {title}
                </Typography>
                {description}
            </CardContent>
            <CardContent className={classes.postHeader}>
                <Button onClick={openTools} variant='outlined' color='inherit' className={classes.moreBtn}>
                    <MoreVertIcon />
                </Button>
            </CardContent>
            <ToolsMenu postIdx={id} anchorEl={anchorEl} openTools={() => openTools()} isOpen={toolsOpen} />
        </Card>
    );
}
export default Post;