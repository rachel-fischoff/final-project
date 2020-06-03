import React from 'react';
import {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box'
import NavBar from './nav_bar'
import NGramTextResults from './n_gram_fetch'
import axios from 'axios'
import Chip from '@material-ui/core/Chip'
import { isArray } from 'util';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
          '& > *': {
            margin: theme.spacing(1),
      }
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        border: '1px solid #d3d4d5',
        margin: 'auto'

      },
      box : {
        margin: 'auto',
        width: '80%',
      }, 
      typography: {
        fontWeight: 'bold'

      },
      button: {
          margin: theme.spacing(1),
        },
      chip:{
          margin: theme.spacing(0.5),
      },
  }));


  export default function TextResults(props) {
  
    const classes = useStyles();
    const inputValue = props.location.state.inputValue

    const [expanded, setExpanded] = useState(false)
    const [dataset, setDataset] = useState([])
 
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  

    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/words');
      console.log(Array.isArray(res.data));
      console.log(typeof res.data);
      console.log(res.data)
      setDataset(res.data);   
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Figure out how to map from dataset
   const renderText = () => (
          <div className={classes.root} > 
            <NavBar/>

            <Box className={classes.box}>
            <Paper className={classes.paper} >
        
                  <Typography className= {classes.typography} variant="h4">
                    
                    {inputValue}


                    <br/> 
          


                    {dataset.map((element)  => { 
                    
                      if(element[1] > .2)
           
                      return (
                    <Chip
                    className ={classes.chip}
                    label = {element[0]}
                    clickable
                    style={{backgroundColor:'green'}}
                    key={element[1]}
                    /> )
                
                    if(.2 > element[1] > .1) 
                      return (
                    <Chip
                    className ={classes.chip}
                    label = {element[0]}
                    clickable
                    key={element[1]}
                    style={{backgroundColor:'yellow'}}
                    /> 
                      )
              
                      if (element[1] < .1) 
                      return (
                    <Chip
                    className ={classes.chip}
                    label = {element[0]}
                    clickable
                    style={{backgroundColor:'red'}}
                    key={element[1]}
                    /> 
                      )
                      })}




                  </Typography>
                
                <Typography >
                
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >   View NGrams
                <ExpandMoreIcon />
                
                </IconButton>
                </Typography>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <NGramTextResults inputValue = {inputValue}/>
              </Collapse>     
              </Paper>
            </Box>
            </div>
   )
    
      return (
        <div>
          {renderText()}
          </div>
      )
    
    }
        

     