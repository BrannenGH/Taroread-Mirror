import React, { useEffect, useState } from 'react';
import {AppBar, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea, Dialog, DialogTitle, DialogActions, DialogContent, Button, DialogContentText } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { TarotCard } from "../../shared/tarot-cards/tarot-card";
import { getTarotMetadata } from '../../shared/tarot-cards/tarot-card-service';
import { TarotCardMetadata } from '../../shared/tarot-cards/tarot-card-metadata';
import { Learn } from '../../learn/learn';
import { ChooseCard } from '../../learn/choose-card/choose-card';
import { ChooseSuit } from '../../learn/choose-suit/choose-suit';
import { ArrowBack } from '@material-ui/icons';
import { Field } from 'formik';

const TarotCardField = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [suit, setSuit] = React.useState<string | null>(null);

    return (
      <Field
        name={props.name}
        initialValue={props.initialValue}
        onChange={props.onChange}
        onBlur={props.onBlur}>
        {({
          field, // { name, value, onChange, onBlur }
          form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: any) => (
          <Box>
            <Box 
              onClick={() => setOpen(true)}>
              <TarotCard
                card={props.allCards.find((card: any) => card.value === field.value)} />
            </Box>
            <Dialog open={open} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Choose card</DialogTitle>
              <DialogContent>
                {!suit && 
                  <ChooseSuit
                    cards={props.allCards}
                    onSelection={(suit: string) => setSuit(suit)}/>
                }
                {!!suit &&
                  <Box>
                    <ArrowBack 
                      onClick={()=> setSuit(null)} />
                    <ChooseCard
                      allCards={props.allCards}
                      suit={suit}
                      onSelection={(card: TarotCardMetadata) => {form.setFieldValue(props.name, card.value); setOpen(false);}}/>
                  </Box>
                }
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {setOpen(false); setSuit(null);}}>Close</Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Field>
    )
};

export { TarotCardField };