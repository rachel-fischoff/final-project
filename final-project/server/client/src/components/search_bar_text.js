import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input'
import NavBar from './nav_bar'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
        margin: theme.spacing(1),
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
      },
  }));

  
export default function SearchBarText () { 
  const classes = useStyles()

  const dispatch = useDispatch();
  let history = useHistory();

  const [inputValue, setInputValue] = useState('')
  const [text, setText]= useState(inputValue)


  // const selectedItem = useSelector( state => state.text)

  const handleInput = (event) => {
    setInputValue(event.target.value);
    console.log('inputValue' + inputValue)
  }
  
//   const updateText = (event) => {
//     event.preventDefault();
//     setText(inputValue);
//     history.push('/text/sentiment', {inputValue: inputValue})
//   }

// useEffect(() => {
// if(inputValue) {
//   history.push('/text/sentiment', { inputValue });
// }}, [inputValue])

    return ( 
          <div>
               <NavBar/>
                <div className={classes.root} >
                {/* <form onSubmit = {updateText}> */}
              <h4>Enter Text</h4>
              {/* TO DO : Link to search results  */}
                  <OutlinedInput id="component-outlined 2" value={inputValue} onChange={handleInput}/>
                      <Link to={{ pathname: "/text/sentiment", state: {inputValue: inputValue}}}>
                      <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      size="large"
                      type = "submit"
                      startIcon={<InputIcon>InputIcon</InputIcon>}
                      // onClick={updateText}
                      // component={Link} to={"/texts/sentiment", {text}, console.log(text  + 'from txxt')}
          
                      >
                       Predict Sentiment
                     </Button> 
                    
                     </Link>
                {/* </form> */}
            </div>
            </div>
          );
    }

 