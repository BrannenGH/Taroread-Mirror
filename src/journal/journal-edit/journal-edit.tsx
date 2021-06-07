import React, { useEffect, useState } from 'react';
import {AppBar, TextField, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea } from "@material-ui/core";
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
import { TarotCardEdit } from './tarot-card-edit';
import { JournalEntry } from '../../shared/tarot-journal/journal-entry';

const JournalEdit = (props: any) => {
    let {id} = useParams() as any;
    const journal = props.allJournals[Number.parseInt(decodeURIComponent(id), 10)];

    return (
        <form>
            <TextField label="Title" />
            <TarotCardEdit />
            <TextField label="Description" />
        </form>
    )
}

export { JournalEdit };