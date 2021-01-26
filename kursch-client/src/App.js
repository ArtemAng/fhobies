import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { makeStyles } from '@material-ui/core'
import NavigationPanel from './components/NavigationPanel';
import { useHttp } from './hooks/http.hook';
import { useItems } from './hooks/items.hook';
import { useComments } from './hooks/comments.hook';
import { useCategories } from './hooks/catigories.hook';
import { ItemsContext } from './context/ItemsContext';
import { CommentsContext } from './context/CommentsContext';
import { CategoriesContext } from './context/Categories';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.primary.backgroundColor,
  }
})

function App() {
  const { root } = useStyles();
  const { login, logout, userId, token } = useAuth();
  const isAutentificated = !!token;
  const [openDrawer, setOpenDrawer] = useState(false);
  const routes = useRoutes(isAutentificated, openDrawer);
  const { request } = useHttp();
  const { items, setItems, setCurrentId, clickedItem } = useItems();
  const { comments, commetsClickedItem, setCurrentItemId, setComments } = useComments();
  const { categories, setCategories, addCategory } = useCategories();
  
  const openDrawerHandle = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(async() => {
      try {
        const data = await request('/api/collectionitems/', 'GET')
        setItems(data.items);
        const data1 = await request('/api/comments/', 'GET')//temp solution
        setComments(data1.comments);
      } catch (e) { }
  }, [request]);

  // useEffect(async ()=>{
  //   try {

  //   }catch (e) {}
  // }, [request]);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories, addCategory }}>
      <CommentsContext.Provider value={{ setCurrentItemId, comments, commetsClickedItem }}>
        <ItemsContext.Provider value={{ items, setCurrentId, clickedItem }}>
          <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{ login, logout, userId, token, isAutentificated }}>
              <Router>
                <div className={root}>
                  <NavigationPanel isAdmin={true} openDrawerHandle={openDrawerHandle} />
                  {routes}
                </div>
              </Router>
            </AuthContext.Provider>
          </ThemeProvider>
        </ItemsContext.Provider>
      </CommentsContext.Provider>
    </CategoriesContext.Provider>
  );
}

export default App;
