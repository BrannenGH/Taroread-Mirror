import React, { useEffect, useState } from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea } from "@material-ui/core";
import axios from 'axios';

const apiBase = 'https://api.hallb.me'

const ChooseSuit = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(apiBase + '/tarot-cards').then(res => setCards(res.data))
  }, [])

    return (
        <div>
          <Typography>Pick Suit</Typography>
          <Grid>
            {cards.map((card: any) => (
              <Grid item xs={3}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <CardMedia
                        component="img"
                        alt=""
                        image={apiBase + card.picture[0].url}
                        title={card.name}
                        />
                      <Typography>{card.suit}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
    )
};

export { ChooseSuit }
