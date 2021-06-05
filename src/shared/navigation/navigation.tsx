import React from 'react';
import Logo from './logo.svg';
import './navigation.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea, ThemeProvider, Hidden, BottomNavigation, BottomNavigationAction, Drawer } from "@material-ui/core";
import { Menu, AccountCircle } from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { AccountDrawer } from '../account-drawer/account-drawer';

const Navigation = (props: any) => {
    const [userProfileVisible, setUserProfileVisible] = React.useState(false);

    return (
        <Grid container
            direction="row"
            alignItems="center">
            <Grid item xs={9} md={3}>
                {props.branding}
            </Grid>
            <Grid item md={6}>
                <Hidden smDown={true}>
                    <nav>
                        <ol className="navigation">
                                {props.children}
                        </ol>
                    </nav>
                </Hidden>
            </Grid>
            <Grid item xs={3}
                container
                direction="row-reverse">
                <AccountCircle
                    onClick={() => setUserProfileVisible(true)}></AccountCircle>
            </Grid>
            <Drawer anchor="right" open={userProfileVisible} 
                onClose={() => setUserProfileVisible(false)}>
                <AccountDrawer
                    onCloseDrawer={() => setUserProfileVisible(false)}/>
            </Drawer>
        </Grid>
    );
}

export { Navigation };