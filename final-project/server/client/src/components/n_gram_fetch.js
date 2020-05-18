import React from 'react';
import {useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function NGramResults(props) {
    const [ngram, setNgram] = useState('')
    const [sentiment, setSentiment] = useState('')
    

    useEffect (()=> {
        fetch ('/text', {
        method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, 
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
        fetch('/text', {method:'GET'}).
        then(response => 
            response.text()).
            then(data=> {
                setSentiment(data)
                console.log(data)
            })
    }, [])



    //TODO - render response - color coordinated and based on polarity, subjectivity and ngrams --

    return (
        <div>
        <CardContent>
            <Typography paragraph color="textPrimary">{ngram}</Typography>
            <Typography paragraph color="textPrimary">{sentiment}</Typography>
        </CardContent>
        </div>
    )

}