import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../contexts/AuthContext';
import theme1 from '../themes/theme1';

const useStyles = makeStyles(theme => ({
  navigation: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2),
      fontSize: '0.4rem',
    },
    '& > *': {
      textTransform: 'none',
      fontSize: '0.7rem',
    },
    defaultLink: {
      color: 'red',
    },
    activeLink: {
      textDecoration: 'none',
    },
  },
}));

export default function NavigationComponent() {
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const theme = useTheme();

  const classes = useStyles();

  return (
    <>
      {true && (
        <Container className={classes.navigation}>
          <div>
            {currentUserProfile && ['patient'].includes(currentUserProfile.role.id) && (
              <Button color="inherit" component={NavLink} to="/paciente/historial">
                Historial
              </Button>
            )}
            {currentUserProfile && ['patient'].includes(currentUserProfile.role.id) && (
              <Button color="inherit" component={NavLink} to="/paciente/form">
                Reportar
              </Button>
            )}
            {currentUserProfile && ['admin', 'doctor'].includes(currentUserProfile.role.id) && (
              <Button color="inherit" component={NavLink} to="/pacientes">
                Pacientes
              </Button>
            )}
            {currentUserProfile && ['admin'].includes(currentUserProfile.role.id) && (
              <Button color="inherit" component={NavLink} to="/perfiles">
                Perfiles
              </Button>
            )}
            {currentUserProfile && ['admin'].includes(currentUserProfile.role.id) && (
              <Button color="inherit" component={NavLink} to="/hospitales">
                Hospitales
              </Button>
            )}
          </div>
        </Container>
      )}
    </>
  );
}
