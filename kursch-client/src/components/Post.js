import { useState } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    makeStyles,
    Typography,
    Avatar,
    IconButton,
    Divider
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
    bold: {
        fontWeight: 'bold'
    }
}))

const Post = ({ image, id, nickName, description, title, props }) => {

    const classes = useStyles();
    const [toolsOpen, setToolsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { setCurrentId } = useContext(ItemsContext)

    const openTools = (e) => {
        setToolsOpen(!toolsOpen);
        !toolsOpen ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    }

    return (
        <Card className={classes.root}>

            <CardHeader
                avatar={
                    <IconButton>
                        <Avatar
                            className={classes.avatar}
                            alt='userAvatar'
                            src={testImg} />
                    </IconButton>
                }
                action={
                    <IconButton onClick={openTools} variant='outlined' color='inherit' className={classes.moreBtn}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography className={classes.nickName} gutterBottom variant="h6" component="h1">
                    {nickName}
                </Typography>}
                className={classes.postHeader} />


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
            <Divider />
            <CardContent>
                {
                    Object.keys(props).map((i, id) => <Typography key={id}><span className={classes.bold}>{i}:</span> {props[i]}</Typography>)
                }
            </CardContent>
            <Divider />
            <ToolsMenu postIdx={id} anchorEl={anchorEl} openTools={() => openTools()} isOpen={toolsOpen} />
        </Card>
    );
}
export default Post;