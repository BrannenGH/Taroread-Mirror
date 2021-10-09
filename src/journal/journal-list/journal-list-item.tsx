import React from "react";
import {
  Card,
  Typography,
  CardContent,
  Grid,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { TarotCard } from "../../shared/tarot-cards/tarot-card";
import { JournalEntry } from "../../shared/tarot-journal/journal-entry";
import { TarotCardMetadata } from "../../shared/tarot-cards/tarot-card-metadata";
import MenuIcon from "@material-ui/icons/Menu";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

const JournalListItem = (props: any) => {
  const journal = props.journal as JournalEntry;
  const allCards = props.allCards as TarotCardMetadata[];
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  );

  return (
    <Card variant="outlined">
      <CardContent onClick={() => props.onClick()}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item md={9}>
            <Typography variant="h5">{journal?.title}</Typography>
          </Grid>
          <Grid item alignItems="flex-end">
            <Button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorElement(event.currentTarget);
                event.stopPropagation();
              }}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorElement}
              keepMounted
              open={Boolean(anchorElement)}
              onClose={() => {
                setAnchorElement(null);
              }}
            >
              <MenuItem
                onClick={(e) => {
                  props.onClick();
                  e.stopPropagation();
                }}
              >
                View
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  props.onDelete();
                  e.stopPropagation();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <Typography>
          {
            // Ordinal dates are only supported with advancedFormat
            dayjs.extend(advancedFormat) &&
              dayjs(journal?.date).format("dddd, MMMM Do, YYYY")
          }
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="flex-end"
          onClick={() => props.onClick()}
        >
          {journal?.cards?.map((value) => (
            <Grid item lg={1} md={2} xs={6}>
              <TarotCard card={allCards.find((card) => card.value == value)} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export { JournalListItem };
