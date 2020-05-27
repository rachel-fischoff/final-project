import React from 'react';
import {useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Chip from '@material-ui/core/Chip';




const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));
  
export default function NGramResults(props) {


    const [dataset, setDataset] = useState({})
    const [words, setWords] = useState({})

    const classes = useStyles ();
    
    const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/ngrams');
        console.log(res.data[0], res.data[1]);
        setDataset(res.data[0]);
        setWords (res.data[1]);
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    // need to loop through data set and match the indexes of ngrams to scores so 

    // Look at the text hightlighter component for a way to map + implement color 
    // if score = (0-.3) = negative, if score = (.3-.5 = neutral) and if (.51 or greater = positive)

    
const renderNgramChips = Object.values(dataset).map((element, index) => {

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
        else if (combinedArray[index][1] < .3)
        negNgrams.push(element)
        else (
        // ( .51 > combinedArray[index][1] > .3 )
        neuNgrams.push (element)
        )
           
    })

    console.log(neuNgrams)
      return (
      <div key={index} >

        <CardContent>
    
               {posNgrams.map(element =>
               <Chip
               label = {element[0]}
               clickable
               color = "primary"
               key={element[1]}
               /> 
               )}

               <br/>
               {negNgrams.map(element =>
               <Chip
               label = {element[0]}
               clickable
               color = "secondary"
               key={element[1]}
               /> )}

                <br/>
                {neuNgrams.map(element => 
               <Chip
               label = {element[0]}
               clickable
               key={element[1]}
            
               /> )}
                <br/>

        </CardContent>
      </div>
      )
    })
const renderNgrams = Object.values(dataset).map((element, index) => {

        const combinedArray = dataset.ngram.map(function(item, index) {
            return [item, dataset.score[index]];
            })
 
         const posNgrams = []
         const negNgrams = []
         const neuNgrams = []

        combinedArray.map((element, index) => {
            if(combinedArray[index][1] > .51) 
            posNgrams.push(element)
            if (combinedArray[index][1] < .3)
            negNgrams.push(element)
            if( .51 > combinedArray[index][1] > .3 )
            neuNgrams.push (element)

         
        })
          return (
          <div key={index} >
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

    const renderWords = Object.values(words).map((element, index) => {
        const combinedArray = words.score.map(function(item, index) {
            return [item, words.word[index]];
                })


            const posWords = []
            const negWords = []
            const neuWords = []
   
           combinedArray.map((element, index) => {
               if(combinedArray[index][0] > .51) 
               posWords.push(element)
               if (combinedArray[index][0] < .3)
               negWords.push(element)
               if( .51 > combinedArray[index][0] > .3 )
               neuWords.push (element)
           })
             return (
             <div key={index}>

               <CardContent>
           
               <Typography paragraph>  

                   {posWords.map(element => <span key={element[0]} style={{color: 'green'}}>{element[1]}</span>)}
                   {negWords.map(element => <span key={element[0]} style={{color: 'red'}}>{element[1]}</span>)}
                   {neuWords.map(element => <span key={element[0]} style={{color: 'yellow'}}>{element[1]}</span>)}
               </Typography>
               </CardContent>
             </div>
             )
           })



           const renderChips = Object.values(words).map((element, index) => {
            const combinedArray = words.score.map(function(item, index) {
                return [item, words.word[index]];
                    })
                console.log(combinedArray)
    
                const posWords = []
                const negWords = []
                const neuWords = []
       
               combinedArray.map((element, index) => {
                   if(combinedArray[index][0] > .51) 
                   posWords.push(element)
                   else if (combinedArray[index][0] < .3)
                   negWords.push(element)
                   else( 
                   neuWords.push (element)
                   )

               })
                 return (
                 <div key={index}>
    
                   <CardContent>
               
                  
    
                       {posWords.map(element =>
                       <Chip
                       label = {element[1]}
                       clickable
                       color = "primary"
                       key={element[0]}
                       /> )} 

                       <br/>
                       {negWords.map(element =>
                       <Chip
                       label = {element[1]}
                       clickable
                       color = "secondary"
                       key={element[0]}
                       /> )}

                        <br/>
                        {neuWords.map(element => 
                       <Chip
                       label = {element[1]}
                       clickable
                       key={element[0]}
                    
                       /> )}
                        <br/>

                   </CardContent>
                 </div>
                 )
               })




    return (
    
        <div>
            {renderNgramChips}
            {/* {renderNgrams} */}
            {/* {renderWords} */}
            {renderChips}
        </div>
    )

}
