import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Card,
  Typography,
  CardContent,
  Container,
  Grid,
  Box,
  CardMedia,
  CardActionArea,
  Paper,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import { TarotCard } from "../../shared/tarot-cards/tarot-card";
import { getTarotMetadata } from "../../shared/tarot-cards/tarot-card-service";
import { TarotCardMetadata } from "../../shared/tarot-cards/tarot-card-metadata";
import { JournalListItem } from "./journal-list-item";
import {
  JournalEntry,
  constructJournalEntry,
} from "../../shared/tarot-journal/journal-entry";
import firebase from "firebase";
import { useUser, useDatabaseList } from "reactfire";

const JournalList = (props: any) => {
  const { data: currentUser } = useUser();
  const history = useHistory();

  return (
    <Grid>
      <Grid item>
        <Grid container direction="row-reverse">
          <Grid item xs={6} md={2}>
            <Box
              onClick={() =>
                props.onModify([...props.allJournals, constructJournalEntry()])
              }
            >
              <Typography className="icon-text" align="center">
                Add new reading
                <Add />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {props.allJournals.map((journal: JournalEntry, index: number) => (
          <JournalListItem
            allCards={props.allCards}
            journal={journal}
            onClick={() =>
              history.push(
                `/journal/edit?user=${
                  (currentUser as firebase.User)?.uid
                }&id=${index}`
              )
            }
            onDelete={() => {
              props.allJournals.splice(index, 1);
              props.onModify(props.allJournals);
            }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export { JournalList };
