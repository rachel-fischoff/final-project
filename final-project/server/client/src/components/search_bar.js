import React from 'react';
import {useState} from 'react';
import {fetchTweets} from '../actions/index';
import { connect, useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
        margin: theme.spacing(1),
      },
  }));

  
export default function SearchBar () { 
    const [term, setTerm] = useState('');
    const dispatch = useDispatch(); 
    
    const classes = useStyles();
  
    const handleChange = (event) => {
      setTerm(event.target.value);
    };
    
   const handleClick = () => {
     console.log(fetchTweets)
    dispatch(fetchTweets())
   } 

        return ( 
           <div>
            <form className={classes.root} noValidate >
                {/* TO DO : Link to search results  */}
                <FormControl variant="outlined"   >
                    <OutlinedInput id="component-outlined" value={term} onChange={handleChange}/>
                </FormControl>
                <div>

                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    size="large"
                    type = "submit"
                    startIcon={<SearchIcon>SearchIcon</SearchIcon>}
                    onClick={handleClick}
                    >
                    Search
                    </Button>

                </div>
            </form> 
          
            </div>
          );
    }
  
    // function mapStateToProps(state) {
    //     console.log(state.term)
    
    //     return ({
    //     term : state.term
    //     })
       
    //   }
        
    // export default connect(mapStateToProps, null)(SearchBar);



