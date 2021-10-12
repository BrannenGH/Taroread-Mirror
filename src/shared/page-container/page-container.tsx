import React, { useEffect, useState } from "react";
import {
  Box,
  Hidden,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./page-container.css";
import TaroLearnIcon from "@material-ui/icons/MenuBook";
import TaroJournalIcon from "@material-ui/icons/Create";
import { IonPage, IonContent } from "@ionic/react";
import { AccountDrawer } from "../account-drawer/account-drawer";
import { TaroreadBar } from "../taroread-bar/taroread-bar";

const PageContainer = (props: any) => {
  const [bottomNavigationLocation, setBottomNavigationLocation] =
    React.useState(0);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IonPage>
      <IonContent>
        <Box mb={8}>
          <AccountDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />
          <TaroreadBar
            setAccountDrawerVisible={(isVisible: boolean) =>
              setIsOpen(isVisible)
            }
            setNavigationDrawerVisible={(isVisible: boolean) => {}}
          />
          <Box m={2}>{props.children}</Box>
          <Hidden mdUp={true}>
            {" "}
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
              <BottomNavigationAction
                label="Journal"
                icon={<TaroJournalIcon />}
              />
            </BottomNavigation>
          </Hidden>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export { PageContainer };
