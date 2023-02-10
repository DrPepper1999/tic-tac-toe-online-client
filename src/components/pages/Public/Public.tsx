import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Container } from "@mui/material";
import { Card } from "../../common/Card/Card";
import { useNavigate } from "react-router-dom";

export const Public = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ backgroundColor:'#5d4a5d', padding: '10px 0px 50px 0px', marginTop:'40px'}}>
      <Grid container justifyContent="center" gap={8} marginTop = "50px">
        <Grid item>
          <Card
            url="images\publicPage\SingIn.jpg"
            onClickHandler={() => navigate("/login")}
            title="Sign in"
          />
        </Grid>
        <Grid item>
          <Card
            title="Guest"
            onClickHandler={() => navigate('')}
            url="images\publicPage\Guest.jpg"
          />
        </Grid>
      </Grid>
      </Paper>
      </Container>
  );
};
