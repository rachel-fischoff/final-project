import React from 'react';
import {useState} from 'react'
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'


export default function TextHighlighter({props}) {
    const inputValue = props.inputValue;
    console.log(inputValue, props)
    let wordsList = []       
    // Split sentence up into words
    const words = inputValue.split(/\W+/);

    wordsList.push(words)
   
    let posWordList=[]
    let neuWordList=[]
    let negWordList=[]

  wordsList.map(word => {
    if (word.length < 8 < 5 ) 
        posWordList.push(word)
    else if (word.length > 8)
        negWordList.push(word)
    else if (word.length < 4)
        neuWordList.push(word)
   })
      return (
        <div>
        <Typography paragraph>  
        {posWordList.map(element => <span style={{color: 'green'}}>{element}</span>)}
        {negWordList.map(element => <span style={{color: 'red'}}>{element}</span>)}
        {negWordList.map(element => <span style={{color: 'yellow'}}>{element}</span>)}
        </Typography>
        </div>
        )
}