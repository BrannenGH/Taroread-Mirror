import React, { useEffect, useState } from 'react';
import {AppBar, TextField, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea } from "@material-ui/core";
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
import { TarotCardEdit } from './tarot-card-edit';
import { JournalEntry } from '../../shared/tarot-journal/journal-entry';
import { Formik } from 'formik';
import { Description } from '@material-ui/icons';

const JournalEdit = (props: any) => {
    let {uid, id} = useParams() as any;
    const journal = props.allJournals[Number.parseInt(decodeURIComponent(id), 10)];

    return (
        <Formik
            initialValues={journal}
            onSubmit={(values) => {
                ;
            }}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form>
                        <TextField
                            name="Title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title} />
                        <TextField
                            name="date"
                            type="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.date} />
                            <Grid
                                container>
                                {
                                    values.cards.map((card: any, i: number) => (
                                        <Grid item md={1}>
                                            <TarotCardEdit
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={card}
                                                allCards={props.allCards} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        <TextField
                            name="Description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description} />
                    </form>
                )}
        </Formik>
    )
}

export { JournalEdit };