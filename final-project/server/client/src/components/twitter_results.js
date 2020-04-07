import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import twitter from '../sample_data'
import NGram from './n_gram';
import Box from '@material-ui/core/Box'
import SearchBarTwitter from './search_bar_twitter'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'

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

  const statuses = twitter.statuses 

  export default function SearchResultsPaper() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    return (
        <div className={classes.root}>
    {statuses.map(elem=>
            <Box className={classes.box}>
            <Paper className={classes.paper} >
                <Typography variant="body2" color="textPrimary" fontWeight="fontWeightBold"  variant="h6">
                    {elem.text}   
                </Typography>
               
                <Typography>
               
                <Avatar aria-label="tweet" className={classes.large} src = "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fceliashatzman%2Ffiles%2F2017%2F09%2FRihanna-Headshot-1200x1800.jpg">
                </Avatar>
              
  
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                label ="nGram"
                >
                <ExpandMoreIcon className={classes.moreIcon}/>
                </IconButton>
                </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <NGram/>
            </Collapse>     
            </Paper>
            </Box>
             )}
        </div>
)
}