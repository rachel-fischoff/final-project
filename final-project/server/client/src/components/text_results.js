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
      console.log(res.data);
      setDataset(res.data);   
  }

  useEffect(() => {
    fetchData();
  }, []);

// Do not want to map it. Want to only display once. Other ways ???
  const renderText = Object.values(dataset).map ((element, index) => {
  
    const combinedArray = dataset.ngram.map((item, index) => {
    return [item, dataset.score[index], dataset.totalwords[index]];
    })
    console.log(combinedArray)



    const posWords = []
    const negWords = []
    const neuWords = []

  
  
   // Line 99:39:   Expected to return a value in arrow function  array-callback-return
   combinedArray.map((element, index) => {
       if(combinedArray[index][1] > .2) 
       posWords.push(element)
       else if (combinedArray[index][1] < .1)
       negWords.push(element)
       else (
       neuWords.push (element)
       )
          
   })

    return (
    <div key ={index} className={classes.root} > 

      <Box className={classes.box}>
      <Paper className={classes.paper} >
  
            <Typography className= {classes.typography} variant="h4">
              
              {inputValue}


              <br/> 
              {/*               
                        TODO: have the chips be in the order of the sentence */}
              {posWords.map(element =>
               <Chip
               className ={classes.chip}
               label = {element[0]}
               clickable
               style={{backgroundColor:'green'}}
               key={element[1]}
               /> 
             
               )}

              {neuWords.map(element =>
               <Chip
               className ={classes.chip}
               label = {element[0]}
               clickable
               key={element[1]}
               style={{backgroundColor:'yellow'}}
               /> 
             
               )}
              {negWords.map(element =>
               <Chip
               className ={classes.chip}
               label = {element[0]}
               clickable
               style={{backgroundColor:'red'}}
               key={element[1]}
               /> 
             
               )}



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
  
  })
      return ( 
      
        <div>
          <NavBar/>
          {renderText}
        </div>
      
         
      )
}