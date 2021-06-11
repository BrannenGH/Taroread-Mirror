import React, { useEffect } from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea, Button, Menu, MenuItem } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { TarotCard } from "../../shared/tarot-cards/tarot-card";
import { JournalEntry } from '../../shared/tarot-journal/journal-entry';
import { TarotCardMetadata } from '../../shared/tarot-cards/tarot-card-metadata';
import MenuIcon from '@material-ui/icons/Menu';

const JournalListItem = (props: any) => {
    const journal = props.journal as JournalEntry;
    const allCards = props.allCards as TarotCardMetadata[];
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);

    return (
      <Box m={3}>
        <Card variant="outlined">
          <CardContent
            onClick={() => props.onClick()}>
            <Grid>
              <Grid item md={9}>
                <Typography>{journal?.title}</Typography>
              </Grid>
              <Grid item>
                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {setAnchorElement(event.currentTarget); event.stopPropagation();}}>
                  <MenuIcon />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorElement}
                  keepMounted
                  open={Boolean(anchorElement)}
                  onClose={() => {setAnchorElement(null)}}
                >
                  <MenuItem
                    onClick={(e) => {props.onClick(); e.stopPropagation();}}>View</MenuItem>
                  <MenuItem
                    onClick={(e) => {props.onDelete(); e.stopPropagation();}}>Delete</MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <Typography>{journal?.date}</Typography>
            <Grid container spacing={2} alignItems="flex-end"
              onClick={() => props.onClick()}>
              {
                journal?.cards?.map(value => (
                  <Grid item lg={1} md={2} xs={6}>
                    <TarotCard
                      card={allCards.find(card => card.value == value)} />
                  </Grid>
                ))
              }
            </Grid>
          </CardContent>
        </Card>
      </Box>
    )
}

export { JournalListItem };