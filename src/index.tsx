import React from 'react';
import Logo from './logo.svg';
import './index.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea, ThemeProvider } from "@material-ui/core";
import { spacing } from '@material-ui/system';
import { Learn } from './learn/learn'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { Navigation } from './shared/navigation/navigation';

function App() {
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


  return (
    <ThemeProvider theme={taroreadTheme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Navigation
              branding={(
                <Grid container
                  direction="row"
                  alignItems="center">
                  <img src={Logo} alt="Taroread" className="logo"></img> 
                  <Typography variant="h3">Taroread</Typography>
                </Grid>
              )}>
              <Link to="/learn">
                <Typography>Learn</Typography>
              </Link>
              <Link to="/journal">
                <Typography>Journal</Typography>
              </Link>
            </Navigation>
          </Toolbar>
        </AppBar>
        <Learn></Learn>
      </Router>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
