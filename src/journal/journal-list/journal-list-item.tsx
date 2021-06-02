import React, { useEffect } from 'react';
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
import { JournalEntry } from '../../shared/tarot-journal/journal-entry';
import { TarotCardMetadata } from '../../shared/tarot-cards/tarot-card-metadata';

const JournalListItem = (props: any) => {
    const journal = props.journal as JournalEntry;
    const allCards = props.allCards as TarotCardMetadata[];

    return (
      <Card>
        <Typography>{journal?.title}</Typography>
        <Typography>{journal?.date}</Typography>
        <Grid container spacing={2} alignItems="flex-end">
          {
            journal?.cards.map(value => (
              <Grid item lg={2} md={4} xs={6}>
                <TarotCard
                  card={allCards.find(card => card.value == value)} />
              </Grid>
            ))
          }
        </Grid>
      </Card>
    )
}

export { JournalListItem };