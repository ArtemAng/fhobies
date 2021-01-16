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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentsModal from './CommentsModal';

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

const Post = ({ nickName, description, title, like, likes }) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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

            <CardMedia
                component='img'
                alt='collection item photo'
                height='300'
                image={testImg} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                    {title}
                </Typography>
                {description}
            </CardContent>
            <CardContent className={classes.postHeader}>
                <Button onClick={like} variant='outlined' color='inherit'>
                    <FavoriteBorderIcon /> {likes.length}
                </Button>
                <Button variant='outlined' color='inherit' onClick={handleOpen}>
                    <ChatBubbleOutlineIcon />
                </Button>
                <Button variant='outlined' color='inherit' className={classes.moreBtn}>
                    <MoreVertIcon />
                </Button>
            </CardContent>
            <CommentsModal open={open} handleClose={() => handleClose()} />
        </Card>
    );
}
export default Post;