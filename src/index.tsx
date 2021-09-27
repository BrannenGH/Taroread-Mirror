import React, { useState, useEffect } from "react";
import "@ionic/react/css/core.css";
import Logo from "./logo.svg";
import "./index.css";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Card,
  Typography,
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
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Learn } from "./learn/learn";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { IonApp, IonTabs, IonRouterOutlet, isPlatform } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Home } from "./home/home";
import { createMuiTheme } from "@material-ui/core/styles";
import firebase from "firebase/app";
import { Journal } from "./journal/journal";
import { TarotCardMetadata } from "./shared/tarot-cards/tarot-card-metadata";
import { getTarotMetadata } from "./shared/tarot-cards/tarot-card-service";
import { PageContainer } from "./shared/page-container/page-container";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./firebase-config.json";

function App() {
  // Bootstrap the application by pulling all the TaroCardMetadata.
  const [allCards, setAllCards] = useState<TarotCardMetadata[]>([]);

  useEffect(() => {
    // Load TaroCardMetadata on load.
    getTarotMetadata().then((res) => setAllCards(res));
  }, []);

  // Set up Taroread theme.
  const taroreadTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#341849",
      },
      secondary: {
        main: "#0C466C",
      },
    },
  });

  return (
    <IonApp>
      <IonReactRouter>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <ThemeProvider theme={taroreadTheme}>
            <IonRouterOutlet>
              <Route path="/learn">
                <Learn allCards={allCards} />
              </Route>
              <Route path="/journal">
                <Journal allCards={allCards} />
              </Route>
              <Route>
                <Home />
              </Route>
            </IonRouterOutlet>
          </ThemeProvider>
        </FirebaseAppProvider>
      </IonReactRouter>
    </IonApp>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
