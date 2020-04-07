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
  }));

  const statuses = twitter.statuses 

  export default function SearchResultsPaper() {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    return (
        
    statuses.map(elem=>
        <div className={classes.root}>
            <Box className={classes.box}>
            <Paper className={classes.paper} >
                <Typography variant="body2" color="textPrimary" fontWeight="fontWeightBold"  variant="h6">
                    {elem.text}
                </Typography>
                <Typography>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
                </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <NGram/>
            </Collapse>     
            </Paper>
            </Box>
            </div>
    )
)
}