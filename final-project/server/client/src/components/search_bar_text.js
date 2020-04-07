import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input'


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

  
export default function SearchBarText (props) { 
  const classes = useStyles()
  const dispatch = useDispatch()

  const [inputType] = useState(props.type)
  const [inputValue, setInputValue] = useState('')

  const changeInputValue = (newValue) => {

      dispatch({ type: 'UPDATE_INPUT', data: newValue});
  };


  function handleChange(event){
    setInputValue(event.target.value);
    if(props.onChange) props.onChange(inputValue)
  }

        
    return ( 
          <div>
                <div className={classes.root} >
                <form>
              <h4>Enter Text</h4>
              {/* TO DO : Link to search results  */}
                  <OutlinedInput id="component-outlined 2" value={inputValue} onChange={changeInputValue}/>
                      <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      size="large"
                      type = "submit"
                      startIcon={<InputIcon>InputIcon</InputIcon>}
                      component={Link} to="/texts/sentiment"
                      >
                       Predict Sentiment
                     </Button> 
                </form>
            </div>
            </div>
          );
    }

 