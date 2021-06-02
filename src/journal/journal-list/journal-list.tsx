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
import { JournalListItem } from './journal-list-item';

const JournalList = (props: any) => {
    return (
        <Grid>
          <Grid item>
            <JournalListItem
              allCards={props.allCards} 
              journal={{
                title: 'My reading',
                cards: [1, 2, 3, 4, 5, 6]
              }} />
          </Grid>
        </Grid>
    );
}

export { JournalList };