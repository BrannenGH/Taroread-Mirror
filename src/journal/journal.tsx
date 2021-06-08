import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JournalList } from './journal-list/journal-list';
import { JournalEdit } from './journal-edit/journal-edit';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { JournalEntry } from '../shared/tarot-journal/journal-entry';
import firebase from 'firebase';

const Journal = (props: any) => {
    const [journals, setJournals] = React.useState<JournalEntry[]>([]);

    // Configure firebase database
    var database = firebase.database();

    useEffect(() => {
        firebase.database().ref(`journals/${(props?.user as firebase.User)?.uid}`).get().then(res => {
            setJournals(res.val() ?? []);
        });
    })

    const onModify = (journals: JournalEntry[]) => {
        // TODO: If journals have an ID of null, create them in firebase.
        firebase.database().ref(`journals/${(props?.user as firebase.User).uid}`).set(journals);
        setJournals(journals);
        /*firebase.database().ref(`journals/${(props?.user as firebase.User)?.uid}`).get().then(res => {
            setJournals(res.val() ?? []);
        });*/
    }

    return (
        <Switch>
            <Route exact path={`/journal`}>
                <JournalList
                    allCards={props.allCards} 
                    allJournals={journals}
                    user={props?.user} 
                    onModify={onModify}/>
            </Route>
            <Route path={`/journal/edit`}>
                <JournalEdit
                    allCards={props.allCards}
                    allJournals={journals} 
                    onModify={onModify} />
            </Route>
        </Switch> 
    )
}

export { Journal };