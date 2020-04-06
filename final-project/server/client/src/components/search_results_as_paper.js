import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActions from '@material-ui/core/CardActions'
import twitter from '../sample_data'
import NGram from './n_gram';
import { sizing } from '@material-ui/system';



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
    avatar: {
      backgroundColor: red[500], //TO DO CHANGE COLOR 
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        variant: "outlined",
        border: '1px solid #d3d4d5',
        width: 'auto',
        direction: "row", 
        justify: "center",

      },
  }));

  const statuses = twitter.statuses 

  export default function SearchResultsPaper() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    return (
        
    statuses.map(elem=>
        <div className={classes.root}>
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
            </div>
    )
)
}