import React from 'react';
import {Component} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const data = [{text: 'the world is ending', sentiment: 'neg'}, 
{text: 'i am scared i wont finish anything worthwhile', sentiment: 'neg'}, 
{text:'i love samantha so much!', sentiment: 'pos'}]


export default class NGram extends Component  {

    constructor(props) {
        super(props);
        this.state = {inputValue: [props.inputValue]
        };
        this.nGrams = this.nGrams.bind(this)
    
      }     


    

    nGrams(sentence, n) {
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
    

      renderNgrams() { 
        return(
        <div>
        <CardContent>
        <Typography paragraph color="textPrimary">NGrams</Typography>
        </CardContent>
        <Typography paragraph>
        {this.state.inputValue.map(element => {
            let result = this.nGrams(element, 3)
            if (element.length < 5)
     
            return( 
                <span style={{color: 'green'}}>{result.map(item => '//' + item)}</span>
  
            )
            if (element.length > 8)
            return( 
              
                  <span style={{color: 'red'}}>{result.map(item => '//' + item)}</span>
             
            )
              if (element.length > 10)
              return( 

                    <span style={{color: 'yellow'}}>{result.map(item => '//' + item)}</span>
  
            )})}
            </Typography>
            </div>
        )
      }

        render() {
                return (
                    <div>
                   {this.renderNgrams()}
                     </div>
                    )
                }
}
