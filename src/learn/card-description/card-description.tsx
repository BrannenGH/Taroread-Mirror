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
import { TarotCard } from '../../shared/tarot-cards/tarot-card';

const apiBase = 'https://api.hallb.me'

const CardDescription = (props: any) => {
    let {suit, name} = useParams() as any;
    const card = props.allCards.find((card: any) => card.name.toLowerCase() === decodeURIComponent(name).toLowerCase());
    
    return (
        <div>
        <Paper>
            <Box m={3}>
                <Typography>{card?.name}</Typography>
            </Box>
        </Paper>
        <Grid container spacing={2} justify="center">
            <Grid item md={4} xs={12}>
                <TarotCard card={card} showMetadata={true}></TarotCard>
            </Grid>
            <Grid item md={8} xs={12}>
                <Grid container
                    direction="row">
                    {card?.keywords.split(/, /g).map((keyword: string) => (
                        <Box borderRadius={16} p={0.5}>
                            <Paper>
                                <Box m={2}>
                                    <Typography>
                                        {keyword}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    ))}
                </Grid>
                <Typography>{card?.description}</Typography>
            </Grid>
        </Grid>
        </div>
    )
}

export { CardDescription }