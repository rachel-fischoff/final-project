import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import twitter from '../sample_data'
import NGram from './n_gram';
import { sizing } from '@material-ui/system';



const useStyles = makeStyles((theme) => ({

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
    card: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        variant: "outlined",
        width:'100%',

      },
  }));

  const statuses = twitter.statuses 

  export default function SearchResultsCardTwitter() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
return (

    statuses.map(elem=>
            <Card className={classes.card} >
            <CardHeader 
                avatar={
                <Avatar aria-label="tweet" className={classes.avatar}>
                    T
                </Avatar>
                }
                // action={
                // <IconButton aria-label="settings">
                //     <MoreVertIcon />
                // </IconButton>
                // }
                title= {elem.username}
                // subheader={elem.percentage}
            />

            <CardContent>
                <Typography variant="body2" color="textPrimary" fontWeight="fontWeightBold"  variant="h6">
                    {elem.text}
                </Typography>
            </CardContent>
            <CardActions>
                {/* <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                 {/* TODO: add favorite links */}
                {/* </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />  */}
                {/* TODO: add to share links */}
                {/* </IconButton> */} 
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
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <NGram/>
            </Collapse>     
            </Card>
    )
)
}