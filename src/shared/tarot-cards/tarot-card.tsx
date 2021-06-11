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
  Paper,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { TarotCardMetadata } from "./tarot-card-metadata";
import { buildImageUrl } from "./tarot-card-service";

const TarotCard = (props: any) => {
  const card = props.card as TarotCardMetadata;

  return (
    <Card>
      {card?.picture && (
        <CardMedia
          component="img"
          alt={card?.picture[0]?.alternativeText && card?.name}
          image={buildImageUrl(card?.picture[0])}
          title={card?.name}
        />
      )}
      {props.showName && <Typography>{card?.name}</Typography>}
      {props.showMetadata && (
        <Typography>Astrological Sign: {card?.astrologicalSign}</Typography>
      )}
      {props.showMetadata && <Typography>Planet: {card?.planet}</Typography>}
    </Card>
  );
};

export { TarotCard };
