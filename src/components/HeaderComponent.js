import React from 'react';
import { withRouter } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useMediaQuery } from '@material-ui/core';
import IconMenu from '@material-ui/icons/Menu';
import logo from '../images/HomeCareView.png';
import { useAuthContext } from '../contexts/AuthContext';
import { NavigationLargeComponent, NavigationMenuComponent } from './NavigationComponent';
import { isLocal, getPropValue } from '../helpers/utils';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  toolbar: {
    minHeight: 36
  },
  title: {
    flexGrow: 1
  },
  currentUser: {
    fontSize: '0.9rem'
  },
  logo: {
    textAlign: 'right',
    height: 44
  }
});

function HeaderComponent({ history }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, currentUserProfile, signOutUser } = useAuthContext();
  const classes = useStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down(750));

  const isLogin = isLocal ? true : !!currentUser;

  const handleClickLogin = () => {
    history.push('/login');
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleHomeClick = () => {
    history.push('/inicio');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    signOutUser();
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" variant="outlined" color="inherit">
        <Toolbar className={classes.toolbar} variant="dense">
          <div className={classes.title}>
            <Typography color="inherit" onClick={handleHomeClick}>
              <img src={logo} className={classes.logo} alt="logo" />
            </Typography>
          </div>

          {!isLogin && (
            <Button disableElevation color="inherit" onClick={handleClickLogin}>
              Login
            </Button>
          )}
          {isLogin && !match && <NavigationLargeComponent />}
          {isLogin && (
            <div>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={handleClick}>
                {!match ? <AccountCircle /> : <IconMenu />}
              </IconButton>
              <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem disabled>
                  <Typography aria-setsize={8} className={classes.currentUser}>
                    {currentUserProfile
                      ? `${getPropValue(currentUserProfile, 'name')} ${getPropValue(currentUserProfile, 'lastName')}`
                      : currentUser && currentUser.email}
                  </Typography>
                </MenuItem>
                {match && <NavigationMenuComponent onClick={handleClose} />}
                <MenuItem onClick={handleClickLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  Salir
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(HeaderComponent);
