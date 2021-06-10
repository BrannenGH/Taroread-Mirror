import React, { useEffect } from 'react';
import Logo from './logo.svg';
import './account-drawer.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {AppBar, Toolbar, Card, Typography, Button, CardContent, Container, Grid, Box, CardMedia, CardActionArea, ThemeProvider, Hidden, BottomNavigation, BottomNavigationAction, Drawer, Avatar, Paper } from "@material-ui/core";
import { Menu, AccountCircle, ArrowBack } from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useUser } from 'reactfire';

const AccountDrawer = (props: any) => {
    const { data: currentUser } = useUser();

    // FirebaseUI config.
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            }
        },
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInFlow: 'popup',
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: 'https://tarotantula.com/',
        // Privacy policy url/callback.
        privacyPolicyUrl: 'https://tarotantula.com/'
    };

    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

    useEffect(() => {
        if (!currentUser) {
            ui.start('#auth', uiConfig);
        }
    });

    return (
        <Box className="account-drawer">
            <Typography>
                <Grid
                    direction="column">
                    <Grid item>
                        <Paper>
                            <Grid container
                                direction="row"
                                onClick={() => props?.onCloseDrawer()}>
                                <Grid item xs={2}>
                                    <ArrowBack />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography>
                                        Go back
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                            {currentUser && 
                                <Grid
                                    container
                                    alignContent="center"
                                    alignItems="center"
                                    direction="column">
                                    <Grid item>
                                        <Box width="20%">
                                            <Avatar alt={currentUser?.displayName ?? ""} src={currentUser?.photoURL ?? ""} className="avatar"/>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Welcome {currentUser?.displayName}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            onClick={() => firebase.auth().signOut()}>Logout</Button>
                                    </Grid>
                                </Grid>
                            }
                            {!currentUser &&  <div id="auth"></div>}
                        </Paper>
                    </Grid>
                </Grid>
            </Typography>
        </Box>
    )
}

export { AccountDrawer };