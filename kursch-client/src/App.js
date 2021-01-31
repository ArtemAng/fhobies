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
import { SocketContext } from './context/SocketContext';
import io from 'socket.io-client';

const socket = io.connect('localhost:1337');

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
  const { comments, commetsClickedItem, setCurrentItemId, setComments, addComment } = useComments();
  const { categories, setCategories, addCategory, currentCategory, setCurrentCategory } = useCategories();

  const openDrawerHandle = () => {
    setOpenDrawer(!openDrawer);
  };


  useEffect(() => {
    socket.emit('get-items');
    socket.on('items', data => {
      setItems(data);
    })
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      <CategoriesContext.Provider value={{ categories, setCategories, addCategory, currentCategory, setCurrentCategory }}>
        <CommentsContext.Provider value={{ setCurrentItemId, comments, commetsClickedItem, setComments, addComment }}>
          <ItemsContext.Provider value={{ items, setCurrentId, clickedItem}}>
            <ThemeProvider theme={theme}>
              <AuthContext.Provider value={{ login, logout, userId, token, isAutentificated }}>
                <Router>
                  <div className={root}>
                    {isAutentificated ? <NavigationPanel isAdmin={true} openDrawerHandle={openDrawerHandle} /> : ''}
                    {routes}
                  </div>
                </Router>
              </AuthContext.Provider>
            </ThemeProvider>
          </ItemsContext.Provider>
        </CommentsContext.Provider>
      </CategoriesContext.Provider>
    </SocketContext.Provider >
  );
}

export default App;
