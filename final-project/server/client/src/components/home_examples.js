import React from 'react';
import {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import InputIcon from '@material-ui/icons/Input';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import NGramExampleResults from './n_gram_examples'

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



  export default function HomeExamples() {
  
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false)
    const  [dataset, setDataset] = useState({ngram: [], score: [], totalwords: []})
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/home');
      setDataset(response.data) 
   
    }

    useEffect(() => {
      fetchData()
  }, []);


  const renderSentiment = () => {

    const combinedArray = dataset.ngram.map((item, index) => {
      return [item, dataset.score[index], dataset.totalwords[index]];
      })
      
    {combinedArray.map((element)  => { 
              
      if(element[1] > .2) {

      return (
    <Chip
    className ={classes.chip}
    label = {element[0]}
    clickable
    style={{backgroundColor:'#4caf50'}}
    key={element[1]}
    /> )
      }

      if (element[1] < .1) {
      return (
    <Chip
    className ={classes.chip}
    label = {element[0]}
    clickable
    style={{backgroundColor:'#d32f2f'}}
    key={element[1]}
    /> 
      )
      }
      if(.2 > element[1] > .1) {
        return (
      <Chip
      className ={classes.chip}
      label = {element[0]}
      clickable
      key={element[1]}
      style={{backgroundColor:'#ffee58'}}
      /> 
        )
        }
      })}

  }


// 
   return  (
    <div className={classes.root}> 

        {/* Probably going to map the data from a json file or database or even csv to here ? */}
      <Box className={classes.box}>
        <Paper className={classes.paper} >
             <Typography className= {classes.typography} variant="h4">
              
              Spread love everywhere you go. Let no one ever come to you without leaving happier -Mother Teresa 
              <br/> 
              <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      size="small"
                      type = "submit"
                      startIcon={<InputIcon>InputIcon</InputIcon>}
                      onClick={renderSentiment}
      
                      >
                      Click Me
                     </Button> 

              <br/> 

    


              

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
          <NGramExampleResults dataset = {dataset} />
        </Collapse>     
        </Paper>
      </Box>
      </div>
)



}
