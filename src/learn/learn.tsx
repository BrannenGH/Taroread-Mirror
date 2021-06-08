import React, { useEffect, useState } from 'react';
import { ChooseSuit } from './choose-suit/choose-suit';
import axios from 'axios';
import { ChooseCard } from './choose-card/choose-card';
import { CardDescription } from './card-description/card-description';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";
import { TarotCardMetadata } from '../shared/tarot-cards/tarot-card-metadata';
import { getTarotMetadata } from '../shared/tarot-cards/tarot-card-service';

const Learn = (props: any) => {
  const history = useHistory();

  return (
    <Switch>
      <Route exact path={`/learn/:suit/:name`}>
        <CardDescription 
          allCards={props.allCards}></CardDescription>
      </Route>
      <Route exact path={`/learn/:suit`}>
        <ChooseCard
          allCards={props.allCards}
          onSelection={(card: TarotCardMetadata) => history.push(`/learn/${encodeURIComponent(card.suit.toLowerCase())}/${encodeURIComponent(card.name.toLowerCase())}`)}/>
      </Route>
      <Route exact path={`/learn`}>
        <ChooseSuit 
            cards={props.allCards}
            onSelection={(suit: string) => history.push(`/learn/${encodeURIComponent(suit.toLowerCase())}`)}/>
      </Route>
    </Switch>
  )
}

export { Learn }