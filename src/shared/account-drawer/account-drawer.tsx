import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  Grid,
  Avatar,
  ButtonBase,
} from "@material-ui/core";
import {
  signInWithGoogle,
  getUser,
  signOut,
} from "../authentication-service/authentication-service";
import { TaroreadUser } from "taroread-native";
import "./account-drawer.css";

/**
 * The element for both the logged-in and logged-out account drawers.
 *
 * @param props The props for the react object
 * @returns A react element
 */
const AccountDrawer = (props: any) => {
  const [user, setUser] = useState<TaroreadUser | null>();

  useEffect(() => {
    getUser()?.then((res: TaroreadUser | null) => {
      setUser(res);
    });
  }, [user]);

  const getInnerDrawer = () => {
    if (user === null) {
      return (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <ButtonBase
              onClick={() =>
                signInWithGoogle().then((user: TaroreadUser | null) => {
                  setUser(user);
                })
              }
            >
              <img
                src="signin/google_signin_buttons/web/2x/btn_google_signin_light_normal_web@2x.png"
                alt="Sign in with Google"
              />
            </ButtonBase>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Avatar
              alt={user?.displayName ?? "Anonymous User"}
              src={user?.photoURL ?? ""}
            />
          </Grid>
          <Grid item>
            <Typography>{user?.displayName ?? "Anonymous User"}</Typography>
          </Grid>
          <Grid item>
            <Typography>{user?.email ?? ""}</Typography>
          </Grid>
          <Grid>
            <Button onClick={() => {signOut().then(() => setUser(null))}}>Sign Out</Button>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Drawer
      classes={{
        paper: "account-drawer",
      }}
      anchor="right"
      open={props.isOpen}
      onClose={props.onClose}
    >
      <Box m={3}>{getInnerDrawer()}</Box>
    </Drawer>
  );
};

export { AccountDrawer };
