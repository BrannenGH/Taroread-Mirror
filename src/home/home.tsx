import React from "react";
import { Typography, Grid, Card, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = (props: any) => {
  return (
    <Box>
      <Typography>Welcome to Taroread!</Typography>
      <Grid container>
        <Grid item md={4} xs={6}>
          <Link to="/learn">
            <Card>
              <Typography>
                Learn about what each of the Tarot Cards mean
              </Typography>
            </Card>
          </Link>
        </Grid>
        <Grid item md={4} xs={6}>
          <Link to="/journal">
            <Card>
              <Typography>
                Record your readings to track your progress
              </Typography>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export { Home };
