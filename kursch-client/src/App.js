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

const useStyles = makeStyles({
  root:{
    minHeight: '100vh',
    backgroundColor: theme.palette.primary.backgroundColor,
  }
})

function App() {
  const {root} = useStyles();
  const { login, logout, userId, token } = useAuth();
  const isAutentificated = !!token;
  const routes = useRoutes(isAutentificated);
  return (
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
  );
}

export default App;
