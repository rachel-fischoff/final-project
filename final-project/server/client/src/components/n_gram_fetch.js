import React from 'react';
import {useEffect} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function NGramResults(props) {
    console.log(props)

    useEffect (()=> {
        fetch ('/text', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(props.inputValue)}).then(response => 
            response.json().then(data=> {
                console.log(data);
            }))
    }, [])


     // could use an async / await funciton on click with a button? want to render the response 

    return (
        <div>
        <CardContent>
            <Typography paragraph color="textPrimary">{}</Typography>
        </CardContent>
        </div>
    )

}