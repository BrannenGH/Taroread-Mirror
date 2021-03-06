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

const apiBase = "https://api.hallb.me";

const ChooseSuit = (props: any) => {
  // Go through every card, the card with the highest value is the face for that Suit
  const suitCards = props.cards.reduce(
    (accum: (TarotCardMetadata | null)[], current: TarotCardMetadata) => {
      var n;
      switch (current.suit) {
        case "Major":
          n = 0;
          break;
        case "Wands":
          n = 1;
          break;
        case "Cups":
          n = 2;
          break;
        case "Swords":
          n = 3;
          break;
        case "Pentacles":
          n = 4;
          break;
        default:
          throw Error();
      }

      if (
        !current.reversed &&
        // Typescript thinks there could be a possible null derefence here
        //@ts-ignore
        (accum[n] === null || accum[n].value < current.value)
      ) {
        accum[n] = current;
      }

      return accum;
    },
    [null, null, null, null, null]
  );

  return (
    <div>
      <Typography>Pick Suit</Typography>
      <Grid container spacing={2} justify="center" alignItems="center">
        {suitCards
          .filter((card: any) => card != null)
          .map((card: any) => (
            <Grid
              item
              lg={2}
              md={4}
              xs={6}
              onClick={() => props.onSelection(card.suit)}
            >
              <TarotCard card={card} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export { ChooseSuit };
