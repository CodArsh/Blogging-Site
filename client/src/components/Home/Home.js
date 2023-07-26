import { Grid } from "@mui/material";
import React from "react";
import Banner from "../banner/Banner";
import Category from "./Category";
import Post from "./Post/Post";

export default function Home() {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item xs={12} sm={2} md={2} ld={2}>
          <Category />
        </Grid>
        <Grid container item xs={12} sm={10} md={10} lg={10}>
          <Post />
        </Grid>
      </Grid>
    </>
  );
}
