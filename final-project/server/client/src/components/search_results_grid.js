import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import SearchResultsCardTwitter from './search_results_card_twitter'
import SearchResultsCardText from './search_results_card_text'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import SearchResultsPaper from './search_results_as_paper'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    margin: 40,
  },
}));

export default function SearchResultsGrid() {
  const classes = useStyles();

  return (
    <React.Fragment>
    <div className={classes.root} >
    <Grid container spacing={3} direction="row" justify="center" alignItems="center" alignContent="flex-start">
        <Grid item xs={10}>
          <SearchResultsPaper/>
        </Grid>
      </Grid>

      {/* <Grid container spacing={24} direction="row" justify="center" >
        <Grid item xs={10}>
          <GridList>
          {/* <GridList cols={2]}> */}
          {/* <GridListTile style={{ height: 'auto'}}>
        <SearchResultsPaper/>
        </GridListTile> */}
        {/* <GridListTile style={{ height: 'auto'}}>
        <SearchResultsCardText/>
        </GridListTile> */}
        {/* </GridList>
        </Grid>
        </Grid> */} 
        </div>
        </React.Fragment>
        )
      }