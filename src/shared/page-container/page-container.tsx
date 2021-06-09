import React, { useEffect } from 'react';
import Logo from '../../logo.svg';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {AppBar, Toolbar, Card, Typography, Button, CardContent, Container, Grid, Box, CardMedia, CardActionArea, ThemeProvider, Hidden, BottomNavigation, BottomNavigationAction, Drawer, Avatar, Paper } from "@material-ui/core";
import { Menu, AccountCircle, ArrowBack } from '@material-ui/icons';
import { spacing } from '@material-ui/system';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { Navigation } from '../navigation/navigation';

const PageContainer = (props: any) => {
  const [bottomNavigationLocation, setBottomNavigationLocation] = React.useState(0);
  const history = useHistory();

    return (
        <Box>
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
                    user={props.user}>
                    <Link to="/learn">
                    <Typography>Learn</Typography>
                    </Link>
                    <Link to="/journal">
                    <Typography>Journal</Typography>
                    </Link>
                </Navigation>
            </Toolbar>
            </AppBar>
            <Box m={2}>
                {props.children}
            </Box>
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
        </Box>
    );
}

export { PageContainer };