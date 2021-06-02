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
import { TarotCard } from '../../shared/tarot-cards/tarot-card';

const apiBase = 'https://api.hallb.me'

const ChooseCard = (props: any) => {
  let {suit} = useParams() as any;
  let cards = props.allCards.filter(((card: any) => card.suit.toLowerCase() === decodeURIComponent(suit).toLowerCase()))

 return (
    <div>
    <Typography>Pick Card</Typography>
    <Grid container spacing={2} justify="center" alignItems="center">
      {cards?.map((card: any) => (
        <Grid item lg={2} md={4} xs={6}>
          <Link
            to={`/learn/${encodeURIComponent(card.suit.toLowerCase())}/${encodeURIComponent(card.name.toLowerCase())}`}>
              <TarotCard card={card} />
          </Link>
        </Grid>
      ))}
    </Grid>
  </div>
 )
}

export { ChooseCard }