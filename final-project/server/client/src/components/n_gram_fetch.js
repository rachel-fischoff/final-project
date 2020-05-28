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
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';




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
  

export default function NGramResults(props) {


    const [dataset, setDataset] = useState({})
    const [words, setWords] = useState({})

    const classes = useStyles ();
    
    const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/ngrams');
        console.log(res.data[0], res.data[1]);
        setDataset(res.data[0]);
        // setWords (res.data[1]);
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    // need to loop through data set and match the indexes of ngrams to scores so 

    // Look at the text hightlighter component for a way to map + implement color 
    // if score = (0-.3) = negative, if score = (.3-.5 = neutral) and if (.51 or greater = positive)

    
const renderNgramChips = Object.values(dataset).map ((element, index) => {
// Object.values(dataset).filter( (element, index, arr) 


    const combinedArray = dataset.ngram.map(function(item, index) {
        return [item, dataset.score[index]];
        })
        console.log(combinedArray)


     const posNgrams = []
     const negNgrams = []
     const neuNgrams = []

    combinedArray.map((element, index) => {
        if(combinedArray[index][1] > .3) 
        posNgrams.push(element)
        else if (combinedArray[index][1] < .1)
        negNgrams.push(element)
        else (
        // ( .51 > combinedArray[index][1] > .3 )
        neuNgrams.push (element)
        )
           
    })

      return (
      <div key = {index} className = {classes.root}>

        <CardContent>
          <List >
            <ListItem className = {classes.list}>
               {posNgrams.map(element =>
               <Chip
               className ={classes.chip}
               label = {element[0]}
               clickable
               color = "primary"
               key={element[1]}
               /> 
             
               )}
              </ListItem>
              <Divider  component="li"/>

              <ListItem className = {classes.list}>
               {neuNgrams.map(element => 
               <Chip
               className ={classes.chip}
               label = {element[0]}
               clickable
               key={element[1]}
            
               /> )}
            </ListItem>
                <Divider  component="li"/>
                <ListItem className = {classes.list}>
               {negNgrams.map(element =>
               <Chip
               className ={classes.chip}
               label = {element[0]}
               clickable
               color = "secondary"
               key={element[1]}
               /> )}
              </ListItem>

            <Divider  component="li"/>
          </List>
        </CardContent>
      </div>
      )
    })



    return (
    
        <div>
            {renderNgramChips}

        </div>
    )

}
