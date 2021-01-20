import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { makeStyles } from '@material-ui/core'
import CssBaseline from "@material-ui/core/CssBaseline";
import NavigationPanel from './components/NavigationPanel';
import { useHttp } from './hooks/http.hook';
import { useItems } from './hooks/items.hook';
import { ItemsContext } from './context/ItemsContext';
import { useComments } from './hooks/comments.hook';
import { CommentsContext } from './context/CommentsContext';

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
  const routes = useRoutes(isAutentificated);
  const { request } = useHttp();
  const { items, setItems, setCurrentId, clickedItem } = useItems();
  const { comments, commetsClickedItem, setCurrentItemId, setComments } = useComments();

  useEffect(async () => {
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
    <CommentsContext.Provider value={{setCurrentItemId, comments, commetsClickedItem}}>
      <ItemsContext.Provider value={{ items, setCurrentId, clickedItem }}>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ login, logout, userId, token, isAutentificated }}>
            <Router>
              <div className={root}>
                <NavigationPanel />
                {routes}
              </div>
            </Router>
          </AuthContext.Provider>
        </ThemeProvider>
      </ItemsContext.Provider>
    </CommentsContext.Provider>
  );
}

export default App;
