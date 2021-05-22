import React from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea } from "@material-ui/core";

const apiBase = 'https://api.hallb.me'

const ChooseCard = (props: any) => {
 return (
    <div>
    <Typography>Pick Card</Typography>
    <Grid container spacing={2} justify="center" alignItems="center">
      {props.cards?.map((card: any) => (
        <Grid item lg={2} md={4} xs={6}>
          <Card>
            <CardActionArea>
              <CardContent>
                { card?.picture &&
                <CardMedia
                  component="img"
                  alt=""
                  image={apiBase + card.picture[0]?.url}
                  title={card.name}
                  />
                }
                {card?.suit && <Typography>{card.name}</Typography>}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
 )
}

export { ChooseCard }