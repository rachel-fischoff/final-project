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

  function SearchBar() {
    const [term, setTerm] = useState('');
    
    
    const classes = useStyles();
  
    const handleChange = (event) => {
      setTerm(event.target.value);
    };

        return (
           <div>
            <form className={classes.root} noValidate onSubmit = {()=> this.props.fetchTweets(term)}>
                <FormControl variant="outlined"   >
                    <OutlinedInput id="component-outlined" value={term} onChange={handleChange}/>
                </FormControl>
                <SearchButtons />
            </form> 
          
            </div>
          );
    }

    function mapStateToProps(state) {
        console.log(state)
    
        return ({
        state
        })
       
      }
        
    export default connect(mapStateToProps, actions)(SearchBar);



