import React from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea, Paper } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { TarotCardMetadata } from './tarot-card-metadata';

const apiBase = 'https://api.hallb.me';

const TarotCard = (props: any) => {
    const card = props.card as TarotCardMetadata

    return (
        <Card>
            { card?.picture &&
                <CardMedia
                component="img"
                alt={card?.picture[0]?.alternativeText}
                image={apiBase + card?.picture[0]?.url}
                title={card?.name}
                />
            }
            <Typography>{card?.name}</Typography>
            {
                props.showMetadata && <Typography>Astrological Sign: {card?.astrologicalSign}</Typography>
            }
            {
                props.showMetadata && <Typography>Planet: {card?.planet}</Typography>
            }
        </Card>
    )

}

export { TarotCard };