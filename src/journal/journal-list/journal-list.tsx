import React, { useEffect, useState } from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea } from "@material-ui/core";
import { Add } from "@material-ui/icons";
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
import { JournalEntry, constructJournalEntry } from '../../shared/tarot-journal/journal-entry';
import firebase from 'firebase';

const JournalList = (props: any) => {
    return (
        <Grid>
          <Grid item>
            <Add 
              onClick={() => props.onModify([...props.allJournals, constructJournalEntry()])}/>
          </Grid>
          <Grid item>
            {props.allJournals.map((journal: JournalEntry, index: number) => (
              <Link to={`/journal/edit?user=${(props?.user as firebase.User)?.uid}&id=${index}`}>
                <JournalListItem
                  allCards={props.allCards} 
                  journal={journal} />
              </Link>
            ))}
          </Grid>
        </Grid>
    );
}

export { JournalList };