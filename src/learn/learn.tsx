import React, { useEffect, useState } from "react";
import { ChooseSuit } from "./choose-suit/choose-suit";
import axios from "axios";
import { ChooseCard } from "./choose-card/choose-card";
import { CardDescription } from "./card-description/card-description";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import { TarotCardMetadata } from "../shared/tarot-cards/tarot-card-metadata";
import { getTarotMetadata } from "../shared/tarot-cards/tarot-card-service";
import { PageContainer } from "../shared/page-container/page-container";

const Learn = (props: any) => {
  const history = useHistory();

  return (
    <Switch>
      <Route exact path={`/learn/:suit/:name`}>
        <PageContainer>
          <CardDescription allCards={props.allCards}></CardDescription>
        </PageContainer>
      </Route>
      <Route exact path={`/learn/:suit`}>
        <PageContainer>
          <ChooseCard
            allCards={props.allCards}
            onSelection={(card: TarotCardMetadata) =>
              history.push(
                `/learn/${encodeURIComponent(
                  card?.suit?.toLowerCase()
                )}/${encodeURIComponent(card?.name?.toLowerCase())}`
              )
            }
          />
        </PageContainer>
      </Route>
      <Route exact path={`/learn`}>
        <PageContainer>
          <ChooseSuit
            cards={props.allCards}
            onSelection={(suit: string) =>
              history.push(`/learn/${encodeURIComponent(suit?.toLowerCase())}`)
            }
          />
        </PageContainer>
      </Route>
    </Switch>
  );
};

export { Learn };
