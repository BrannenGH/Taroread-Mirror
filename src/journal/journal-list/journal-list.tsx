import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, Button, Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { JournalListItem } from "./journal-list-item";
import { ContentContainer } from "../../shared/content-container/content-container";
import { TaroreadUser, TaroreadJournal } from "taroread-native";
import { SignInWithGoogleButton } from "../../shared/signin/signin-with-google-button";
import "./journal-list.css";
import {
  useUser,
  useRefreshUser,
} from "../../taroread-native/hooks/authentication-hooks";
import {
  useGetJournals,
  useAddJournal,
} from "../../taroread-native/hooks/journal-hooks";

const JournalList = (props: any) => {
  const history = useHistory();
  const [journals, setJournals] = useState<TaroreadJournal[]>([]);
  const user = useUser();
  const getJournals = useGetJournals();
  const refreshUser = useRefreshUser();
  const addJournal = useAddJournal();

  useEffect(() => {
    if (!!user) {
      fetchJournals(0);
    }
  }, [user]);

  const fetchJournals = (page: number) => {
    getJournals(page).then((res) => setJournals(res));
  };

  const navigateToJournal = (uid: string, id: string) => {
    history.push(`/journal/edit?user=${uid}&id=${id}`);
  };

  const renderJournalList = (journals: TaroreadJournal[] | null) => {
    if (!journals || journals.length < 1) {
      return <Typography>Loading</Typography>;
    } else {
      return journals?.map((journal: TaroreadJournal) => (
        <JournalListItem
          allCards={props.allCards}
          journal={journal}
          onClick={() => {
            if (!!user?.uid && !!journal.id) {
              // @ts-ignore Types checked at runtime in if statement.
              navigateToJournal(user.uid, journal.id);
            } else {
              throw new Error(
                `Could not navigate to journal ${journal.id} for user ${user?.uid}.`
              );
            }
          }}
          onDelete={() => {
            if (!!journal?.id) {
              // @ts-ignore Journal ID is for sure defined
              deleteJournal(journal.id);
              fetchJournals(0);
            }
          }}
        />
      ));
    }
  };

  if (!!user) {
    // If logged in
    return (
      <ContentContainer
        title="Choose Reading to View"
        menuItems={
          <Button
            onClick={() =>
              addJournal().then((id) => {
                if (!!user?.uid && !!id) {
                  // @ts-ignore Types checked at runtime in if statement.
                  navigateToJournal(user.uid, id);
                }
              })
            }
          >
            <Typography className="icon-text" align="center">
              Add new reading
              <Add />
            </Typography>
          </Button>
        }
      >
        {renderJournalList(journals)}
      </ContentContainer>
    );
  } else {
    // If logged out
    return (
      <ContentContainer title="Choose Reading to View">
        <Paper>
          <Box p={3}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignContent="center"
              classes={{
                root: "logged-out-grid",
              }}
            >
              <Grid item>
                <Typography align="center" variant="h4">
                  You're logged out!
                </Typography>
                <Typography align="center" variant="h5">
                  To journal your readings, you need to login or create an
                  account.
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="center" variant="h4">
                  Please, sign in below and get started! 😄
                </Typography>
              </Grid>
              <Grid item>
                <SignInWithGoogleButton
                  onLogin={(user: TaroreadUser | null) => refreshUser()}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </ContentContainer>
    );
  }
};

export { JournalList };
