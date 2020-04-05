import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function NGram  () {
    
let data = [{text: 'the world is ending', sentiment: 'neg'}, {text: 'i am scared i wont finish anything worthwhile', sentiment: 'neg'}, {text:'i love samantha so much!', sentiment: 'pos'}]

// const nGramsArray = [];
// const nGramsResult = data.map(item => ([{nGram: (nGrams(item.text, 3))}, {sentiment: item.sentiment}]))
// console.log(nGramsResult)  

// nGramsArray.push(nGramsResult)

// console.log(nGramsArray)

function nGrams(sentence, n) {
    // Split sentence up into words
    var words = sentence.split(/\W+/);
    // Total number of n-grams we will have
    var total = words.length - n;
    var grams = [];
    // Loop through and create all sequences
    for (var i = 0; i <= total; i++) {
      var seq = '';
      for (var j = i; j < i + n; j++) {
        seq += words[j] + ' ';
      }
      // Add to array
      grams.push(seq);
    }
    return grams;
  }


        return(
            data.map(element => {
                if(element.sentiment ='pos') {
                    let result = nGrams(element.text, 3)
                   
                    return (
            <div style={{"color": "green"}}>
                <CardContent>
                <Typography paragraph>NGrams</Typography>
                <Typography paragraph>
                {'//' + result  + '//'}
                </Typography>
                </CardContent>
            </div> )
                 } else if (element.sentiment = 'neg') {
                    let result = nGrams(element.text, 3)
                     return(
                    <div style={{"color": "red"}}>
                    <CardContent>
                    <Typography paragraph>NGrams</Typography>
                    <Typography paragraph>
                    {'//' + result + '//'}
                    </Typography>
                    </CardContent>
                    
                </div> )
                } else if ( element.sentiment = 'neu') {
                    let result = nGrams(element.text, 3)
        
                    return (
                    <div style={{"color": "yellow"}}>
                    <CardContent>
                    <Typography paragraph>NGrams</Typography>
                    <Typography paragraph>
                    {'//' + result +'//'}
                    </Typography>
                    </CardContent>
                </div>
                    )
                }
            })
            )
}