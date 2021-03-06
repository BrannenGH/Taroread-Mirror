import React from "react";
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
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { TarotCard } from "../../shared/tarot-cards/tarot-card";
import { TarotCardMetadata } from "../../shared/tarot-cards/tarot-card-metadata";
import ReverseIcon from "@material-ui/icons/Autorenew";
import { reverse } from "../../shared/tarot-cards/tarot-card-service";

const apiBase = "https://api.hallb.me";

const ChooseCard = (props: any) => {
  let suit = (useParams() as any)?.suit ?? props.suit;
  let cards: TarotCardMetadata[] = props.allCards.filter(
    (card: any) =>
      card.suit.toLowerCase() === decodeURIComponent(suit).toLowerCase()
  );

  return (
    <div>
      <Typography>Pick Card</Typography>
      <Grid container spacing={2} justify="center" alignItems="center">
        {cards
          ?.filter((card) => !card.reversed)
          .map((card) => (
            <Grid
              item
              lg={2}
              md={4}
              xs={6}
              onClick={() => props.onSelection(card)}
            >
              <ReverseIcon
                onClick={(e) => {
                  props.onSelection(reverse(card, props.allCards));
                  e.stopPropagation();
                }}
              />
              <TarotCard card={card} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export { ChooseCard };
