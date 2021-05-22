import React from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea, Paper } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const apiBase = 'https://api.hallb.me'

const CardDescription = (props: any) => {
    let {suit, name} = useParams() as any;
    const card = props.allCards.find((card: any) => card.name === decodeURIComponent(name));
    
    return (
        <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item md={4} xs={12}>
                <Paper>
                    { card?.picture &&
                        <img
                        alt=""
                        src={apiBase + card.picture[0]?.url}
                        />
                    }
                </Paper>
            </Grid>
            <Grid item md={8} xs={12}>
                <Typography>{card.name}</Typography>
                <Typography>{card.keywords}</Typography>
                <Typography>{card.description}</Typography>
            </Grid>
        </Grid>
    )
}

export { CardDescription }