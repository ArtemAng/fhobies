import { useState, useCallback, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DrawerTools from '../components/admin/DrawerTools';
import CategoriesList from '../components/admin/CategoriesList';
import AddCategoryForm from '../components/admin/AddCategoryForm';
import PropsList from '../components/admin/PropsList';
import Typography from '@material-ui/core/Typography';
import { useHttp } from '../hooks/http.hook';
import { CategoriesContext } from '../context/Categories';
import {useCategories} from '../hooks/catigories.hook';
import {SocketContext} from '../context/SocketContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  fixedHeight: {
    minHeight: 260,
  },
  headerTyp: {
    marginBottom: theme.spacing(2)
  }
}));

export default function Dashboard({ open, openDrawerHandle }) {
  const classes = useStyles();

  const [data, setData] = useState({ name: '', props: [] });
  const { request } = useHttp();
  const {categories, setCategories, removeCategory} = useCategories();
  const {socket} = useContext(SocketContext);
  
  const requestAddHandle = useCallback(async () => {
    try {
      if (data.name) {
        await request('/api/categories/addcategory', 'POST', { data });
      }
    } catch (e) { }
  }, [request, data]);


  const addPropsHandle = (value) => {
    const { props } = data;
    if (value.type && value.name && props.findIndex(i => i.name === value.name) === -1)
      setData({ ...data, props: [...props, value] });
  }
  const removePropHandle = (idx) => {
    const { props } = data;
    setData({ ...data, props: [...props.slice(0, idx), ...props.slice(idx + 1)] });
  }
  const nameChangeHandle = (event) => {
    setData({ ...data, name: event.target.value });
  }

  const getData = async () => {
    const serverData = await request('/api/categories/', 'GET');
    console.log(serverData);
  }
  
  useEffect( () => {
    socket.emit('get-categories');
    socket.on('categories', (data) => {
      setCategories(data);
    })
  }, [socket])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <DrawerTools open={open} />

      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={4} lg={3}>
              <CategoriesContext.Provider value={{categories, setCategories, removeCategory}}>
                <CategoriesList categories />
              </CategoriesContext.Provider>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Typography
                  className={classes.headerTyp}
                  variant='h6'
                  align='center'
                  component='h4'>
                  Add category
                </Typography>
                <AddCategoryForm
                  requestAddHandle={requestAddHandle}
                  nameChangeHandle={(e) => nameChangeHandle(e)}
                  addPropsHandle={addPropsHandle} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <PropsList removePropHandle={removePropHandle} propsList={data.props} />
            </Grid>
            {/* Recent Deposits */}

            {/* Recent Orders */}

          </Grid>
        </Container>
      </main>
    </div>
  );
}