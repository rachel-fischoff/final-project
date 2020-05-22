import React from 'react';
import {useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NGramSentiment from './ngram_sentiment'
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
        // setNgrams (res.data.ngram.map(element=>element))
        // setScore (res.data.score.map(element=>element))
    }

    useEffect(() => {
        fetchData();
    }, []);

    
    // // fetches the ngram data and sentiment scores
    // useEffect (()=>{
       
    //     fetch('/ngrams', {
    //         method:'GET',
    //         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //         mode: 'cors'
    //     })
    //     .then(response => 
    //         //response.text ? which is better?
    //         response.json())
    //         .then(data=> {
    //             //sets the dataset to be the ngram_data from the backend
    //             setDataset(data.ngram)
    //             console.log(data)
     
    //         })
    //         setTimeout(()=> {console.log('is the timer working?')}, 3000)
    // }, [])


    // const matchScoresToNgrams = ()


    // Look at the text hightlighter component for a way to map + implement color 

    const renderNgrams = Object.values(dataset).map((element, index) => {
        

        console.log(dataset)
        //TODO -- loop through the result + join the two nearest to each other into an array with two values (string/number) 
        //then map out the strings by color according to their number  
        return <div key = {index}>
               <CardContent className = {classes.root}>
                <Typography color="textPrimary" fontWeight="fontWeightBold" variant="h6">{<span key={index} style={{color: 'green'}}>{element}</span> }</Typography>
                <Typography className={classes.typography} color="textPrimary" fontWeight="fontWeightBold" variant="h6"><span style={{color: 'red'}}>{dataset.ngram}</span></Typography>
                <Typography color="textPrimary" fontWeight="fontWeightBold" variant="h6"><span style={{color: 'yellow'}}>{dataset.score}</span></Typography>
            </CardContent>
        </div>
    })


    return (
    
        <div>
            {renderNgrams}
        </div>
    )

}


