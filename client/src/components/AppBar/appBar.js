import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './style';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../images/boomtown.svg';
import { Link } from 'react-router-dom';

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/items">
            <CardMedia className={classes.logo} component="img" image={logo} />
          </Link>
          <Typography variant="h6" color="inherit" className={classes.grow} />
          <Link to="/share">
            <Button variant="extended" color="primary" size="medium">
              <AddIcon />
              Share Something
            </Button>
          </Link>
          {/* log out mutation why no work */}
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
