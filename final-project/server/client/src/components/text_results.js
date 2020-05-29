import React from 'react';
import {useRef, useEffect, useState, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box'
import NavBar from './nav_bar'
import NGramResults from './n_gram_fetch'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input'


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
        color: theme.palette.text.secondary,
        border: '1px solid #d3d4d5',
        margin: 'auto',

      },
      box : {
        margin: 'auto',
        width: '80%',
      }, 
      button: {
          margin: theme.spacing(1),
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: '25ch',
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
      const res = await axios.get('http://localhost:5000/ngrams');
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

    //I want to filter the array of arrays so I only return the arrays with the index[2] = 1  

    return (
    <div key ={index} className={classes.root} > 

      <Box className={classes.box}>
      <Paper className={classes.paper} >
  
            <Typography variant="body2" color="textPrimary" fontWeight="fontWeightBold"  variant="h6">
              
              {inputValue}
              <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size="large"
              type = "submit"
              startIcon={<InputIcon>InputIcon</InputIcon>}
              >
              Predict Sentiment 
              </Button> 
              <br/> 
              
              display the color coded sentence 
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
          <NGramResults inputValue = {inputValue}/>
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