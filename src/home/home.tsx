import React from "react";
import { Typography, Grid, Card, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PageContainer } from "../shared/page-container/page-container";

const Home = (props: any) => {
  return (
    <PageContainer>
      <Box>
        <Typography>Welcome to Taroread!</Typography>
        <Grid container>
          <Grid item md={4} xs={6}>
            <Box m={2}>
              <Link to="/learn">
                <Card>
                  <Box p={4}>
                    <Typography>
                      Learn about what each of the Tarot Cards mean
                    </Typography>
                  </Box>
                </Card>
              </Link>
            </Box>
          </Grid>
          <Grid item md={4} xs={6}>
            <Box m={2}>
              <Link to="/journal">
                <Card>
                  <Box p={4}>
                    <Typography>
                      Record your readings to track your progress
                    </Typography>
                  </Box>
                </Card>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export { Home };
