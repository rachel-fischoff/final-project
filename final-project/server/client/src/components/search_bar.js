import React from 'react';
import {Component, useState} from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import SearchButtons from '../material_ui/buttons'
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  
export default function SearchBar() {
    const [term, setTerm] = useState('');
    
    
    const classes = useStyles();
  
    const handleChange = (event) => {
      setTerm(event.target.value);
    };

    const handleClick = () => {
        this.props.fetchTwitter(setTerm)
    }
        return (
            <form className={classes.root} noValidate onSubmit={handleClick}>
                <FormControl variant="outlined" >
                    <OutlinedInput id="component-outlined" value={term} onChange={handleChange}/>
                    <SearchButtons />
                </FormControl>
            </form> 
        
          );
    }


