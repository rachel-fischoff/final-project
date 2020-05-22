import React from 'react';
import {useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
          '& > *': {
            margin: theme.spacing(1),
      },
      // Change this to an if statement about the color and sentiment 
      typography: {
        color: 'red'
      },
    }}))

export default function NGramResults(props) {

    //to make empty arrays or strings ???
    const [dataset, setDataset] = useState({})
    // const [ngrams, setNgrams] = useState('')
    // const [score, setScore] = useState('')
    
    const classes = useStyles();


    const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/ngrams');
        console.log(res.data);
        setDataset(res.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // need to loop through data set and match the indexes of ngrams to scores so 

    // Look at the text hightlighter component for a way to map + implement color 
    // if score = (0-.3) = negative, if score = (.3-.5 = neutral) and if (.51 or greater = positive)

    const renderNgrams = Object.values(dataset).map((element, index) => {

        const combinedArray = dataset.ngram.map(function(item, index) {
            return [item, dataset.score[index]];
            })
            console.log(combinedArray)
        
         const posNgrams = []
         const negNgrams = []
         const neuNgrams = []

        combinedArray.map((element, index) => {
            if(combinedArray[index][1] > .51) 
            posNgrams.push(element)
            if (combinedArray[index][1] < .3)
            negNgrams.push(element)
            if(combinedArray[index][1] > .3 > .51)
            neuNgrams.push (element)
        })
          return (
          <div>
            <CardContent>
          <Typography paragraph>  
          {posNgrams.map(element => <span key={element[1]} style={{color: 'green'}}>{element[0]}</span>)}
          {negNgrams.map(element => <span key={element[1]} style={{color: 'red'}}>{element[0]}</span>)}
          {neuNgrams.map(element => <span key={element[1]} style={{color: 'yellow'}}>{element[0]}</span>)}
          </Typography>
            </CardContent>
          </div>
          )
        })


    return (
    
        <div>
            {renderNgrams}
        </div>
    )

}
