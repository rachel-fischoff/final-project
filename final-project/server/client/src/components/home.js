import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './nav_bar'


const useStyles = makeStyles((theme) => ({

  overrides: {
    MuiListItem: {
      root: {
        textAlign: 'center',
        alignItems: 'center',
      },

    }
  },
    root: {
      textAlign: 'center',
        display: 'flex',
        '& > *': {
          margin: theme.spacing(0.5),
        },
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
      },
      chip: {
        margin: theme.spacing(0.5),

      },
      list: {
        display: 'block',
        alignItem: 'center',
        textAlign: 'center',
    
      },
    }
  ));

  export default function Home(props) {


    const classes = useStyles ();
    
        return (
            <div> 
               <NavBar/>
             <h6 className = {classes.root}>  HOME PAGE  -- ADD EXAMPLE TWEETS AND QUOTES WITH NGRAMS</h6>
             <br/>
            </div>
        )
    }
    
 
 

 