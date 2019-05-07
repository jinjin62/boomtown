import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './style';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../images/boomtown.svg';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';

class ButtonAppBar extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, logout } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Link to="/items">
              <CardMedia
                className={classes.logo}
                component="img"
                image={logo}
              />
            </Link>
            <Typography variant="h6" color="inherit" className={classes.grow} />
            <Link to="/share">
              <Button variant="extended" color="primary" size="medium">
                <AddIcon />
                Share Something
              </Button>
            </Link>
            {/* log out mutation why no work */}
            <Button
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem
                onClick={this.handleClose}
                component={Link}
                to="/profile"
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout().catch(e => console.logo(e));
                  this.setState({ anchorEl: null });
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logout'
  }),
  withStyles(styles)
)(ButtonAppBar);
