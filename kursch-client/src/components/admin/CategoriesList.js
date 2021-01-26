import { useContext } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Divider,
    List
} from '@material-ui/core';
import CategoriesListItem from './CategoriesListItem';
import { CategoriesContext } from '../../context/Categories';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    content: {
        overflowY: 'scroll',
        height: 145
    },
    root: {
        height:260
    }
}));

const CategoriesList = () => {
    const classes = useStyles();

    const { categories, removeCategory } = useContext(CategoriesContext)

    return (
        <Card className={classes.root}>
            <CardHeader
                title={<Typography variant='h6' align='center' component='h4'>Categories</Typography>}
            />
            <Divider />
            <CardContent className={classes.content}>
                {categories.map((i,idx)=><CategoriesListItem removeCategory={()=>removeCategory(i._id)} key={idx} title={i.name} />)}


            </CardContent>
            <CardContent >

                <Divider />
            </CardContent>

        </Card>
    );
}
export default CategoriesList;