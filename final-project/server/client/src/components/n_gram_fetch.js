import React from 'react';
import {useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


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
    const [ngram, setNgram] = useState('')
    const [sentiment, setSentiment] = useState('')
    
      
    const classes = useStyles();

    useEffect (()=> {
        fetch ('/text', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, 
        body: JSON.stringify(props.inputValue)
        })
        .then(response => 
            response.text())
            .then(data=> {
                setNgram(data)
                console.log(data);
            })
    }, [])

    useEffect (()=>{
        fetch('/text', {
            method:'GET', 
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'} 
        })
        .then(response => 
            response.json())
            .then(data=> {
                setSentiment(data)
                console.log(data)
            })
    }, [])



    //TODO color coordinated and based on polarity, subjectivity and ngrams --

    return (
        <div>
        <CardContent className = {classes.root}>
            <Typography className={classes.typography} color="textPrimary" fontWeight="fontWeightBold" variant="h6">{ngram}</Typography>
            <Typography className={classes.typography} color="textPrimary" fontWeight="fontWeightBold"  variant="h6">{sentiment}</Typography>
        </CardContent>
        </div>
    )

}