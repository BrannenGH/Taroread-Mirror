import React from 'react';
import Logo from './logo.svg';
import './index.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea } from "@material-ui/core";
import { spacing } from '@material-ui/system';
import { Learn } from './learn/learn'

function App() {
  return (
    <div>
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
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
