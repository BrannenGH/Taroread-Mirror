import React, { useEffect, useState } from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { TarotCard } from "../../shared/tarot-cards/tarot-card";
import { getTarotMetadata } from '../../shared/tarot-cards/tarot-card-service';
import { TarotCardMetadata } from '../../shared/tarot-cards/tarot-card-metadata';

const TarotCardEdit = (props: any) => {
    return (
      <TarotCard
        card={props.allCards.find((card: any) => card.value === props.value)}>
      </TarotCard>
    )
}

export { TarotCardEdit }