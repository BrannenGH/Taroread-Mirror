import React from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const JournalList = (props: any) => {
    return (
        <Grid>
          <Card>
            <Typography>My reading</Typography>
            <Typography>02/03/2021</Typography>
          </Card>
        </Grid>
    );
}

export { JournalList };