import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import SearchResultsCard from './search_results_card'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function SearchResultsGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="row" justify="space-evenly">
        <Grid item xs={12} sm={6}>
          <SearchResultsCard/>
        </Grid>
        </Grid>
        </div>
        )
      }