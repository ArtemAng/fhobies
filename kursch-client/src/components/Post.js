import { useState } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    makeStyles,
    Typography,
    Avatar,
    Button
} from '@material-ui/core';
import testImg from '../images/as.jpg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useContext } from 'react';
import ToolsMenu from '../components/ToolsMenu';
import { Link } from 'react-router-dom';
import { ItemsContext } from '../context/ItemsContext';
import { Image } from "cloudinary-react";

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

const Post = ({ image, id, nickName, description, title, like, likes, postIdx }) => {

    const classes = useStyles();
    // const [postComments, setPostComments] = useState([]);
    const [toolsOpen, setToolsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { setCurrentId } = useContext(ItemsContext)
    // useEffect(() => {
    //     const filteredComments = comments.map(i => i._id === id ? i : null).filter(i => i !== null);
    //     setPostComments(filteredComments);
    //     // console.log(comments.map(i=>i._id===id? i:null));
    // }, [comments, setPostComments])

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

            <CardActionArea onClick={() => setCurrentId(id)}>
                <Link to='/collectionItems'>
                    {/* <CardMedia
                        component='img'
                        alt='collection item photo'
                        height='300'> */}
                    <Image cloudName="dmqwdeeva"
                        height='300'
                        width='100%'
                        publicId={image} />
                    {/* </CardMedia> */}
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