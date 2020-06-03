import React from 'react';
import {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
          '& > *': {
            margin: theme.spacing(1),
      }
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
        color: theme.palette.text.primary,
        border: '1px solid #d3d4d5',
        margin: 'auto'

      },
      box : {
        margin: 'auto',
        width: '80%',
      }, 
      typography: {
        fontWeight: 'bold'

      },
      button: {
          margin: theme.spacing(1),
        },
      chip:{
          margin: theme.spacing(0.5),
      },
  }));