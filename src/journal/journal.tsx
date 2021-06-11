import React, { useEffect, useState } from "react";
import axios from "axios";
import { JournalList } from "./journal-list/journal-list";
import { JournalEdit } from "./journal-edit/journal-edit";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { JournalEntry } from "../shared/tarot-journal/journal-entry";
import firebase from "firebase";
import { Typography } from "@material-ui/core";
import { useUser, useDatabase, useDatabaseList } from "reactfire";

const Journal = (props: any) => {
  const { data: currentUser } = useUser();

  const [journals, setJournals] = React.useState<JournalEntry[]>([]);
  const journalDB = useDatabase().ref(
    `journals/${(currentUser as firebase.User)?.uid}`
  );

  useEffect(() => {
    journalDB.get().then((res) => {
      setJournals(res.val() ?? []);
    });
  }, [currentUser]);

  const onModify = (journals: JournalEntry[]) => {
    journalDB.set(journals);
    setJournals(journals);
  };

  // If logged in
  if (!!currentUser) {
    return (
      <Switch>
        <Route exact path={`/journal`}>
          <JournalList
            allCards={props.allCards}
            allJournals={journals}
            onModify={onModify}
          />
        </Route>
        <Route path={`/journal/edit`}>
          <JournalEdit
            allCards={props.allCards}
            allJournals={journals}
            onModify={onModify}
          />
        </Route>
      </Switch>
    );
  } else {
    return <Typography>You need to login to use Tarojournal.</Typography>;
  }
};

export { Journal };
