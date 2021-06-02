import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JournalList } from './journal-list/journal-list';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const Journal = (props: any) => {
    return (
        <Switch>
            <Route exact path={`/journal/:entryId`}>
            </Route>
            <Route exact path={`/journal`}>
               <JournalList
                    allCards={props.allCards} />
            </Route>
        </Switch> 
    )
}

export { Journal };