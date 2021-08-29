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
  Button,
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
import { ContentContainer } from "../../shared/content-container/content-container";

const JournalList = (props: any) => {
  const { data: currentUser } = useUser();
  const history = useHistory();

  return (
    <ContentContainer
      title="Choose Reading to View"
      menuItems={
        <Button
          onClick={() =>
            props.onModify([...props.allJournals, constructJournalEntry()])
          }
        >
          <Typography className="icon-text" align="center">
            Add new reading
            <Add />
          </Typography>
        </Button>
      }
    >
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
    </ContentContainer>
  );
};

export { JournalList };
