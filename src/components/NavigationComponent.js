import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuthContext } from '../contexts/AuthContext';

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
  const { currentUser, currentUserProfile } = useAuthContext();

  const classes = useStyles();

  return (
    <>
      {true && (
        <Container className={classes.navigation}>
          <div>
            {currentUserProfile && ['patient'].includes(currentUserProfile.role.id) && (
              <>
                <Button color="inherit" component={NavLink} to="/paciente/historial">
                  Historial
                </Button>
                <Button color="inherit" component={NavLink} to="/paciente/form">
                  Prueba
                </Button>
              </>
            )}
            {currentUserProfile && ['doctor'].includes(currentUserProfile.role.id) && (
              <Button color="inherit" component={NavLink} to="/pacientes">
                Pacientes
              </Button>
            )}
            {currentUserProfile && ['doctor'].includes(currentUserProfile.role.id) && (
              <Button color="inherit" component={NavLink} to="/medicamentos">
                Medicamentos
              </Button>
            )}
            {currentUserProfile && ['admin'].includes(currentUserProfile.role.id) && (
              <>
                <Button color="inherit" component={NavLink} to="/perfiles">
                  Perfiles
                </Button>
                <Button color="inherit" component={NavLink} to="/hospitales">
                  Hospitales
                </Button>
              </>
            )}
          </div>
        </Container>
      )}
    </>
  );
}
