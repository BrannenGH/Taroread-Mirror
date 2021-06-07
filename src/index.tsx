import React, {useState, useEffect} from 'react';
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
import { TarotCardMetadata } from './shared/tarot-cards/tarot-card-metadata';
import { getTarotMetadata } from './shared/tarot-cards/tarot-card-service';

function App() {
  // Initialize Firebase.
  const firebaseApp = (function() {
    if (!firebase.apps.length) {
      return firebase.initializeApp(firebaseConfig);
    } else {
      return firebase.app();
    }
  })();

  const [bottomNavigationLocation, setBottomNavigationLocation] = React.useState(0);
  const [history, _] = React.useState(useHistory());
  const [user, setUser] = React.useState<firebase.User | null>(null);

  // Bootstrap the application by pulling all the TaroCardMetadata.
  const [allCards, setAllCards] = useState<TarotCardMetadata[]>([]);

  useEffect(() => {
    // Load TaroCardMetadata on load.
    getTarotMetadata().then(res =>
      setAllCards(res)
    )
  }, [])

  // Set up Taroread theme.
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

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <ThemeProvider theme={taroreadTheme}>
        <AppBar position="static">
          <Toolbar>
            <Navigation
              branding={(
                <Link to="/">
                  <Grid container
                    direction="row"
                    alignItems="center">
                      <img src={Logo} alt="Taroread" className="logo"></img> 
                      <Typography variant="h3">Taroread</Typography>
                  </Grid>
                </Link>
              )}
                user={user}>
                <Link to="/learn">
                  <Typography>Learn</Typography>
                </Link>
                <Link to="/journal">
                  <Typography>Journal</Typography>
                </Link>
            </Navigation>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path={`/learn`}>
            <Learn 
              allCards={allCards} />
          </Route>
          <Route exact path={`/journal`}>
            <Journal 
              allCards={allCards} 
              user={user} />
          </Route>
          <Route path={`/`}>
            <Home />
          </Route>
        </Switch>
        <Hidden mdUp={true}>
            <BottomNavigation
                value={bottomNavigationLocation}
                onChange={(event: any, newValue: any) => {
                    switch(newValue){
                      case 0:
                        history.push('/learn');
                        break;
                      case 1:
                        history.push('/journal');
                        break;
                    }
                    setBottomNavigationLocation(newValue);
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
