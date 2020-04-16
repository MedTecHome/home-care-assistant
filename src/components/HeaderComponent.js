import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthContext } from './login/context/AuthContext';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function HeaderComponent({ history }) {
  const classes = useStyles();
  const { currentUser, signOutUser } = useContext(AuthContext);
  const handleClickLogin = () => {
    history.push('/login');
  };

  const handleClickHome = () => {
    history.push('/inicio');
  };

  const handleClickLogout = () => {
    signOutUser();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.title}>
          <Button color="inherit" onClick={handleClickHome}>
            Inicio
          </Button>
        </div>
        {currentUser && <Typography>{currentUser.email}</Typography>}
        {!currentUser && (
          <Button color="inherit" onClick={handleClickLogin}>
            Login
          </Button>
        )}
        {currentUser && (
          <IconButton onClick={handleClickLogout} color="inherit">
            <ExitToAppIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(HeaderComponent);
