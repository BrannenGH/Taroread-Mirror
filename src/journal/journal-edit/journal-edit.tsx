import React, { useEffect, useState } from "react";
import {
  TextField,
  Card,
  Typography,
  CardContent,
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { TarotCardField } from "./tarot-card-field";
import { Formik, FieldArray } from "formik";
import { Add } from "@material-ui/icons";
import { ContentContainer } from "../../shared/content-container/content-container";
import {
  getJournal,
  updateJournal,
} from "../../shared/journal-service/journal-service";
import { useUserState } from "../../shared/use-user-state/use-user-state";

const JournalEdit = (props: any) => {
  let query = new URLSearchParams(useLocation().search);
  let id = String(decodeURIComponent(query.get("id") ?? ""));
  const [journal, setJournal] = useState<any>(null);
  const history = useHistory();
  const [user, setUser] = useUserState();

  useEffect(() => {
    getJournal(id).then((res: any) => setJournal(res));
  }, [user]);

  if (!!journal) {
    return (
      <ContentContainer title="Edit Reading">
        <Card variant="outlined">
          <CardContent>
            <Formik
              initialValues={journal}
              onSubmit={(values, { setSubmitting }) => {
                updateJournal(id, values);
                setSubmitting(false);
                history.push("/journal/");
              }}
            >
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
                    <Grid direction="column">
                      <Grid item>
                        <TextField
                          name="title"
                          label="Title"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={values.title}
                          style={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          name="date"
                          label="Date"
                          type="date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={values.date}
                          style={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item>
                        <FieldArray
                          name="cards"
                          render={(arrayHelpers) => (
                            <Grid container>
                              {values?.cards?.map((card: any, i: number) => (
                                <Grid item xs={6} md={1}>
                                  <Box m={1}>
                                    <TarotCardField
                                      name={`cards.${i}`}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      onDelete={() => arrayHelpers.remove(i)}
                                      initialValue={card}
                                      allCards={props.allCards}
                                    />
                                  </Box>
                                </Grid>
                              ))}
                              <Grid item md={1}>
                                <Add
                                  onClick={() =>
                                    arrayHelpers.insert(
                                      values?.cards?.length ?? 0,
                                      1
                                    )
                                  }
                                />
                              </Grid>
                            </Grid>
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          name="description"
                          label="Notes"
                          variant="outlined"
                          multiline
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={values.description}
                          style={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item>
                        <Button type="submit" disabled={isSubmitting}>
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              )}
            </Formik>
          </CardContent>
        </Card>
      </ContentContainer>
    );
  } else {
    return <Typography>Loading</Typography>;
  }
};

export { JournalEdit };
