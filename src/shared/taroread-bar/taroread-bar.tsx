import React from "react";
import Logo from "../../logo.svg";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  Hidden,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useUserState } from "../use-user-state/use-user-state";
import "./taroread-bar.css";

const TaroreadBar = (props: any) => {
  const [user, setUser] = useUserState();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Link to="/">
              <Grid container direction="row" alignItems="center">
                <img src="/logowithtext.svg" className="taroread-logo" alt="Taroread logo"></img>
              </Grid>
            </Link>
          </Grid>
          <Hidden smDown={true}>
            <Grid item>
                <nav>
                  <ol className="navigation">
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
                  </ol>
                </nav>
            </Grid>
          </Hidden>
          <Grid item className="avatar-container">
            <Avatar
              alt={user?.displayName ?? "Logged out user"}
              src={user?.photoURL ?? ""}
              onClick={() => props.setAccountDrawerVisible(true)}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

TaroreadBar.propTypes = {
  setAccountDrawerVisible: PropTypes.func.isRequired,
  setNavigationDrawerVisible: PropTypes.func.isRequired,
};

export { TaroreadBar };
