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
            <img src={Logo} alt="Taroread" className="logo"></img> 
            <Typography>Taroread</Typography>
            <Typography>Learn</Typography>
          </Toolbar>
        </AppBar>
        <Box m={3}>
          <Learn></Learn>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
