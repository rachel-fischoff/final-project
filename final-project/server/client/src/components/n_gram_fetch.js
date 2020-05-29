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

    const classes = useStyles ();
    
    const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/ngrams');
        // it loops three times 
        console.log(res.data);

        setDataset(res.data);
        // setWords (res.data[1]);
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    // need to loop through data set and match the indexes of ngrams to scores so 

    // Look at the text hightlighter component for a way to map + implement color 
    // if score = (0-.3) = negative, if score = (.3-.5 = neutral) and if (.51 or greater = positive)

    
const renderNgramChips = Object.values(dataset).map ((element, index ) => {

    const combinedArray = dataset.ngram.map(function(item, index) {
        return [item, dataset.score[index], dataset.totalwords[index]];
        })
    
     const posNgrams = []
     const negNgrams = []
     const neuNgrams = []

    combinedArray.map((element, index) => {
        if(combinedArray[index][1] > .2) 
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
                <Typography> positive </Typography>
      
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
              <Typography> neutral </Typography>
                <br/>
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
                <Typography> negative </Typography>
                <br/>
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
