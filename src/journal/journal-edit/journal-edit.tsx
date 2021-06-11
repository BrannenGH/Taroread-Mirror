import React, { useEffect, useState } from 'react';
import {AppBar, Paper, TextField, Toolbar, Card, Typography, CardContent, Container, Grid, Box, CardMedia, CardActionArea, Button } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation
} from "react-router-dom";
import { TarotCard } from "../../shared/tarot-cards/tarot-card";
import { getTarotMetadata } from '../../shared/tarot-cards/tarot-card-service';
import { TarotCardMetadata } from '../../shared/tarot-cards/tarot-card-metadata';
import { TarotCardField } from './tarot-card-field';
import { JournalEntry } from '../../shared/tarot-journal/journal-entry';
import { Formik, FieldArray } from 'formik';
import { Description, Add } from '@material-ui/icons';

const JournalEdit = (props: any) => {
    let query = new URLSearchParams(useLocation().search);
    let id = Number.parseInt(decodeURIComponent(query.get("id") ?? ""), 10);
    const journal = props.allJournals[id];

    return (
        <Grid container alignItems="center" justify="center">
            <Grid item xs = {false} md={2}>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper>
                    <Formik
                        initialValues={journal}
                        onSubmit={(values, { setSubmitting }) => {
                            const journals = props.allJournals;
                            journals[id] = values;
                            props.onModify(journals)
                            setSubmitting(false)
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
                                <Box m={2}>
                                    <form onSubmit={handleSubmit}>
                                        <Grid
                                            direction="column">
                                            <Grid item>
                                                <TextField
                                                    name="title"
                                                    label="Title"
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    defaultValue={values.title} />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    name="date"
                                                    label="Date"
                                                    type="date"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    defaultValue={values.date} />
                                            </Grid>
                                            <Grid item>
                                                <FieldArray
                                                    name="cards"
                                                    render={arrayHelpers => (
                                                        <Grid container>
                                                        {
                                                            values?.cards?.map((card: any, i: number) => (
                                                                <Grid item xs={6} md={1}>
                                                                    <TarotCardField
                                                                        name={`cards.${i}`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        onDelete={() => arrayHelpers.remove(i)}
                                                                        initialValue={card}
                                                                        allCards={props.allCards} />
                                                                </Grid>
                                                            ))
                                                        }
                                                            <Grid item md={1}>
                                                                <Add
                                                                    onClick={() => arrayHelpers.insert(values?.cards?.length ?? 0, 1)} />
                                                            </Grid>
                                                        </Grid>
                                                    )}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    name="description"
                                                    label="Notes"
                                                    multiline
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    defaultValue={values.description} />
                                            </Grid>
                                            <Grid item>
                                                <Button type="submit" disabled={isSubmitting}>Save</Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Box>
                            )}
                    </Formik>
                </Paper>
            </Grid>
            <Grid item xs = {false} md={2}>

            </Grid>
        </Grid>
    )
}

export { JournalEdit };