import React from 'react';
import Logo from './logo.svg';
import './navigation.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea, ThemeProvider, Hidden, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';

const Navigation = (props: any) => {

    return (
        <Grid container
            direction="row"
            alignItems="center">
            <Grid item>
                {props.branding}
            </Grid>
            <Grid item>
                <Hidden smDown={true}>
                    <nav>
                        <ol className="navigation">
                                {props.children}
                        </ol>
                    </nav>
                </Hidden>
            </Grid>
        </Grid>
    );
}

export { Navigation };