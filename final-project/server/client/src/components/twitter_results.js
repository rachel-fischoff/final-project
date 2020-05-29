import React from 'react';
import { useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import NavBar from './nav_bar'
import NGramTwitterResults from './n_gram_twitter'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
      },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: '1px solid #d3d4d5',
        margin: 'auto',

      },
    box : {
        margin: 'auto',
        width: '80%',
      }, 
    moreIcon: {
      marginLeft: 'auto'
      
    }
  }));

  export default function TwitterResults(props) {
  
  const classes = useStyles();
  const term = props.location.state.term

  const [expanded, setExpanded] = useState(false);
  const [dataset, setDataset] = useState([])


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const fetchData = async () => {
  //   const res = await axios.get('http://localhost:5000/words');
    console.log('to put twitter info');
  //   setDataset(res.data);   
}

useEffect(() => {
  fetchData();
}, []);



    return (
        <div className={classes.root}>
          <NavBar/>
            <Box className={classes.box}>
            <Paper className={classes.paper} >
                <Typography color="textPrimary" fontWeight="fontWeightBold"  variant="h6">
                {term}
                <br/>
                put top tweets and sentiment per word with colored chips
                </Typography>
               
                <Typography paragraph>
               
                {/* <Avatar aria-label="tweet" className={classes.large} src = "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fceliashatzman%2Ffiles%2F2017%2F09%2FRihanna-Headshot-1200x1800.jpg">
                </Avatar>
               */}
  
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
         
                > View NGrams
                <ExpandMoreIcon className={classes.moreIcon}/>
                </IconButton>
                </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <NGramTwitterResults term = {term}/>
            </Collapse>     
            </Paper>
            </Box>
        </div>
)
}