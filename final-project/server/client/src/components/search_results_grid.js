import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import SearchResultsCardTwitter from './search_results_card_twitter'
import SearchResultsCardText from './search_results_card_text'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { sizing } from '@material-ui/system';
import SearchResultsPaper from './search_results_as_paper'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    width: "100%",
  },
}));

export default function SearchResultsGrid() {
  const classes = useStyles();

  return (
    <React.Fragment>
    <div className={classes.root} >
      <Grid container spacing={40} style={{paddingLeft: 0, paddingRight: 0}}>
        <Grid item xs={12}>
          <GridList>
          {/* <GridList cols={2]}> */}
          <GridListTile style={{ height: 'auto'}}>
        <SearchResultsPaper/>
        </GridListTile>
        {/* <GridListTile style={{ height: 'auto'}}>
        <SearchResultsCardText/>
        </GridListTile> */}
        </GridList>
        </Grid>
        </Grid>
        </div>
        </React.Fragment>
        )
      }