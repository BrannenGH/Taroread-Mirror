import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";
import { TaroreadUser } from "taroread-native";
import "./account-drawer.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { SignInWithGoogleButton } from "../signin/signin-with-google-button";
import {
  useUser,
  useSignOut,
  useRefreshUser,
} from "../../taroread-native/hooks/authentication-hooks";

/**
 * The element for both the logged-in and logged-out account drawers.
 *
 * @param props The props for the react object
 * @returns A react element
 */
const AccountDrawer = (props: any) => {
  const user = useUser();
  const signOut = useSignOut();
  const refreshUser = useRefreshUser();

  const getBackButton = () => {
    return (
      <Grid container direction="row" justifyContent="flex-start">
        <Grid item>
          <ArrowBackIcon
            onClick={() => {
              props.setIsOpen(false);
            }}
          />
        </Grid>
        <Grid item>
          <Typography>Back</Typography>
        </Grid>
      </Grid>
    );
  };

  const getInnerDrawer: () => JSX.Element = () => {
    if (user === null) {
      return (
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            classes={{
              root: "full-width",
            }}
          >
            {getBackButton()}
          </Grid>
          <Grid item>
            <SignInWithGoogleButton
              onLogin={(user: TaroreadUser | null) => refreshUser()}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            classes={{
              root: "full-width",
            }}
          >
            {getBackButton()}
          </Grid>
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
            <Button
              onClick={() => {
                signOut().then(() => refreshUser());
              }}
            >
              Sign Out
            </Button>
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
