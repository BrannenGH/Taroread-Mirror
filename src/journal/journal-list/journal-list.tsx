import React from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { TarotCard } from "../../shared/tarot-cards/tarot-card";

const JournalList = (props: any) => {
    return (
        <Grid>
          <Grid item>
            <Card>
              <Typography>My reading</Typography>
              <Typography>02/03/2021</Typography>
              <Grid
                direction="column">
                  <Grid item xs={1}>
                    <TarotCard
                      card={{
                          "id": 2,
                          "Name": null,
                          "Suit": null,
                          "published_at": "2021-05-22T16:01:43.003Z",
                          "created_at": "2021-05-22T16:01:39.413Z",
                          "updated_at": "2021-05-26T22:58:59.406Z",
                          "Order": null,
                          "name": "The Magician",
                          "suit": "Major",
                          "order": null,
                          "Value": null,
                          "value": 2,
                          "keywords": "Infinite Resources, Manifestation, Magic, Tricks, Mercury, Gemini, Air",
                          "description": null,
                          "astrologicalSign": null,
                          "planet": null,
                          "picture": [
                            {
                              "id": 10,
                              "name": "MajorMagician.jpg",
                              "alternativeText": "",
                              "caption": "",
                              "width": 300,
                              "height": 528,
                              "formats": {
                                "small": {
                                  "ext": ".jpg",
                                  "url": "/uploads/small_Major_Magician_09c3d5b3f9.jpg",
                                  "hash": "small_Major_Magician_09c3d5b3f9",
                                  "mime": "image/jpeg",
                                  "name": "small_MajorMagician.jpg",
                                  "path": null,
                                  "size": 40.65,
                                  "width": 284,
                                  "height": 500
                                },
                                "thumbnail": {
                                  "ext": ".jpg",
                                  "url": "/uploads/thumbnail_Major_Magician_09c3d5b3f9.jpg",
                                  "hash": "thumbnail_Major_Magician_09c3d5b3f9",
                                  "mime": "image/jpeg",
                                  "name": "thumbnail_MajorMagician.jpg",
                                  "path": null,
                                  "size": 5.72,
                                  "width": 89,
                                  "height": 156
                                }
                              },
                              "hash": "Major_Magician_09c3d5b3f9",
                              "ext": ".jpg",
                              "mime": "image/jpeg",
                              "size": 31.69,
                              "url": "/uploads/Major_Magician_09c3d5b3f9.jpg",
                              "previewUrl": null,
                              "provider": "local",
                              "provider_metadata": null,
                              "created_at": "2021-05-23T01:58:41.079Z",
                              "updated_at": "2021-05-23T01:58:41.088Z"
                            }
                          ]
                        } 
                      }></TarotCard>
                  </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
    );
}

export { JournalList };