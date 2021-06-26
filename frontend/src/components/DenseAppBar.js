import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Box, Button} from "@material-ui/core";
import MaterialLink from '@material-ui/core/Link';
import {Link} from "react-router-dom";
import Logo from '../assets/logo.svg';
import LoopWhite from '../assets/loop-white.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color={'secondary'}>
        <Toolbar variant="dense">
          {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}
          <div className={'logo-container'}>
            <img src={LoopWhite} height={20}/>
            <img src={Logo} height={34} style={{'margin-left': '-6px'}}/>
          </div>
          <Box ml={6} color={'#ccc'}>
            <Button color={'inherit'} component={Link} to="/cluster-debugger">Cluster Debugger</Button>
            <Button color={'inherit'} component={Link} to="/confused-debugger">Confused Debugger</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}