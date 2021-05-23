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
  useParams
} from "react-router-dom";

const apiBase = 'https://api.hallb.me'

const Learn = () => {
  const [allCards, setAllCards] = useState<any[]>([]);
;

  useEffect(() => {
    axios.get(apiBase + '/tarot-cards').then(res => setAllCards(res.data.sort(function(a:any, b:any){return a.value - b.value})))
  }, [])

  return (
    <Switch>
      <Route exact path={`/:suit/:name`}>
        <CardDescription 
          allCards={allCards}></CardDescription>
      </Route>
      <Route exact path={`/:suit`}>
        <ChooseCard
          allCards={allCards}>
        </ChooseCard>
      </Route>
      <Route exact path={`/`}>
        <ChooseSuit 
            cards={allCards}>
        </ChooseSuit>
      </Route>
    </Switch>
  )
}

export { Learn }