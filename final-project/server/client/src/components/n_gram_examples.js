import React from 'react';
import {useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


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
  

export default function NGramExampleResults(props) {

    const [dataset, setDataset] = useState({ngram: [], score: [], totalwords: []})

    const classes = useStyles ();

    useEffect(() => {
        setDataset(props.dataset)
    }, []);

    const renderNgramChips = () => {
    

      const combinedArray = dataset.ngram.map((item, index) => {
          return [item, dataset.score[index], dataset.totalwords[index]];
          })
      
       const posNgrams = []
       const negNgrams = []
       const neuNgrams = []

       console.log(combinedArray, 'combinedArray')


  
       const avg4 = () => dataset.score.reduce((a, x) => a + x, 0) / dataset.score.length
       console.log(avg4())
  
  
       //  Line 86:40:  Expected to return a value in arrow function  array-callback-return
      combinedArray.map((element, index) => {
          if(combinedArray[index][1] > 0) 
          posNgrams.push(element)
          else if (combinedArray[index][1] < -.5)
          negNgrams.push(element)
          else
          neuNgrams.push (element)
             
      })
  
        return (
        <div  className = {classes.root}>
  
          <CardContent>
            <List >
              <ListItem className = {classes.list}>
                  <Typography> positive </Typography>
        
                 {posNgrams.map(element =>
                 <Chip
                 className ={classes.chip}
                 label = {element[0]}
                 clickable
                 style={{backgroundColor:'#4caf50'}}
                 key={element[1]}
                 /> 
               
                 )}
                </ListItem>
                <Divider  component="li"/>
  
                <ListItem className = {classes.list}>
                <Typography> neutral </Typography>
                  <br/>
                 {neuNgrams.map(element => 
                 <Chip
                 className ={classes.chip}
                 label = {element[0]}
                 clickable
                 key={element[1]}
                 style={{backgroundColor:'#ffee58'}}
              
                 /> )}
              </ListItem>
                  <Divider  component="li"/>
                  <ListItem className = {classes.list}>
                  <Typography> negative </Typography>
                  <br/>
                 {negNgrams.map(element =>
                 <Chip
                 className ={classes.chip}
                 label = {element[0]}
                 clickable
                 style={{backgroundColor: '#d32f2f' }}
                 key={element[1]}
                 /> )}
                </ListItem>
  
              <Divider  component="li"/>
            </List>
          </CardContent>
        </div>
        )
      }
  
  
  
      return (
      
          <div>
              {renderNgramChips()}
  
          </div>
      )
  
  }