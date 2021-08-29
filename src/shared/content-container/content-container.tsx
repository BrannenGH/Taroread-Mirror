import React from "react";
import { Typography, Grid, Box } from "@material-ui/core";

const ContentContainer = (props: any) => {
  return (
    <Box m={1}>
      <Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Typography variant="h4">{props.title}</Typography>
            </Grid>
            <Grid item alignItems="center">
              {props.menuItems}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Box m={2}>{props.children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export { ContentContainer };
