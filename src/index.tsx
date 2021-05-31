import React from 'react';
import Logo from './logo.svg';
import './index.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea, ThemeProvider, Hidden, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { spacing } from '@material-ui/system';
import { Learn } from './learn/learn'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Home } from './home/home';
import { createMuiTheme } from '@material-ui/core/styles';
import { Navigation } from './shared/navigation/navigation';
import firebase from 'firebase/app';
import firebaseConfig from './firebase-config.json';
import { Journal } from './journal/journal';


function App() {
  const [value, setValue] = React.useState(0);
  const [history, _] = React.useState(useHistory());

  const taroreadTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#341849'
      },
      secondary: {
        main: '#0C466C'
      }
    }
  })
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  return (
    <ThemeProvider theme={taroreadTheme}>
        <AppBar position="static">
          <Toolbar>
            <Navigation
              branding={(
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Grid container
                    direction="row"
                    alignItems="center">

                      <img src={Logo} alt="Taroread" className="logo"></img> 
                      <Typography variant="h3">Taroread</Typography>
                  </Grid>
                </Link>
              )}>
                <Link to="/learn" style={{ textDecoration: 'none' }}>
                  <Typography>Learn</Typography>
                </Link>
                <Link to="/journal" style={{ textDecoration: 'none' }}>
                  <Typography>Journal</Typography>
                </Link>
            </Navigation>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path={`/learn`}>
            <Learn />
          </Route>
          <Route exact path={`/journal`}>
            <Journal></Journal>
          </Route>
          <Route path={`/`}>
            <Home />
          </Route>
        </Switch>
        <Hidden mdUp={true}>
            <BottomNavigation
                value={value}
                onChange={(event: any, newValue: any) => {
                    switch(newValue){
                      case 0:
                        history.push('/learn');
                        break;
                      case 1:
                        history.push('/journal');
                        break;
                    }
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction label="Learn" />
                <BottomNavigationAction label="Journal" />
            </BottomNavigation>
        </Hidden>
    </ThemeProvider>
  );
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
