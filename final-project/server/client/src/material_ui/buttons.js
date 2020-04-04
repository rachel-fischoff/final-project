import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SearchButton() {
  const classes = useStyles();

  return (
    <div>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        size="large"
        type = "submit"
        startIcon={<SearchIcon>SearchIcon</SearchIcon>}
      >
        Search
      </Button>
      
    </div>
  );
}
