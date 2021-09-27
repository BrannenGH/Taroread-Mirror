import React, { useEffect, useState } from "react";
import Logo from "../../logo.svg";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Card,
  Typography,
  Button,
  CardContent,
  Container,
  Grid,
  Box,
  CardMedia,
  CardActionArea,
  ThemeProvider,
  Hidden,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  Avatar,
  Paper,
} from "@material-ui/core";
import { Menu, AccountCircle, ArrowBack } from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { Navigation } from "../navigation/navigation";
import { useAnalytics } from "reactfire";
import "./page-container.css";
import TaroLearnIcon from "@material-ui/icons/MenuBook";
import TaroJournalIcon from "@material-ui/icons/Create";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  isPlatform,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { AccountDrawer } from "../account-drawer/account-drawer";

const PageContainer = (props: any) => {
  const [bottomNavigationLocation, setBottomNavigationLocation] =
    React.useState(0);
  const history = useHistory();
  const isNative = isPlatform("ios") || isPlatform("android");
  const [isOpen, setIsOpen] = useState(false);

  const getNavigation = () => (
    <BottomNavigation
      className="bottom-navigation"
      value={bottomNavigationLocation}
      onChange={(event: any, newValue: any) => {
        switch (newValue) {
          case 0:
            history.push("/learn");
            break;
          case 1:
            history.push("/journal");
            break;
        }
        setBottomNavigationLocation(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Learn" icon={<TaroLearnIcon />} />
      <BottomNavigationAction label="Journal" icon={<TaroJournalIcon />} />
    </BottomNavigation>
  );

    return (
      <IonPage>
        <IonContent>
      <Box mb={8}>
        <AccountDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClose={() => {setIsOpen(false)}} />
        <AppBar position="sticky">
          <Toolbar>
            <Grid container direction="row" alignItems="center">

            <Navigation
              branding={
                <Link to="/">
                  <Grid container direction="row" alignItems="center">
                    <img src={Logo} alt="Taroread" className="logo"></img>
                    <Typography variant="h3">Taroread</Typography>
                  </Grid>
                </Link>
              }
            >
              <li>
                <Link to="/learn">
                  <Typography>Learn</Typography>
                </Link>
              </li>
              <li>
                <Link to="/journal">
                  <Typography>Journal</Typography>
                </Link>
              </li>
            </Navigation>
            </Grid>
          </Toolbar>
          <Button onClick={() => {setIsOpen(true);}}>Account</Button>
        </AppBar>
          <Box m={2}>{props.children}</Box>
        <Hidden mdUp={true}>{getNavigation()}</Hidden>
      </Box>
      </IonContent>
      </IonPage>
    );
  };

export { PageContainer };
