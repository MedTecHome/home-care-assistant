import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import RouteListConfig from '../routes/RoutesListConfig';
import { useAuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  navigation: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    },
    '& > *': {
      padding: 2,
      fontSize: '0.8rem'
    }
  },
  activeLink: {
    '&.active': {
      fontWeight: 600,
      color: theme.palette.primary.main,
      textDecoration: 'underline'
    }
  }
}));

// eslint-disable-next-line no-unused-vars
function NavigationMenu({ onClick }, ref) {
  const { currentUserProfile } = useAuthContext();
  const classes = useStyles();

  return (
    <>
      {currentUserProfile &&
        RouteListConfig.filter(route => {
          if (route.navegation) {
            return route.navegation instanceof Array ? route.navegation.includes(currentUserProfile.role) : true;
          }
          return false;
        })
          .filter(route => route.roles.includes(currentUserProfile.role))
          .map((route, index) => (
            <MenuItem
              color="inherit"
              key={index.toString()}
              component={NavLink}
              to={route.path}
              onClick={onClick}
              className={classes.activeLink}
            >
              {route.label}
            </MenuItem>
          ))}
      <Divider />
    </>
  );
}

export const NavigationMenuComponent = forwardRef(NavigationMenu);

export function NavigationLargeComponent() {
  const { currentUserProfile } = useAuthContext();
  const classes = useStyles();
  return (
    <>
      {currentUserProfile && (
        <Container className={classes.navigation}>
          {currentUserProfile &&
            RouteListConfig.filter(route => {
              if (route.navegation) {
                return route.navegation instanceof Array ? route.navegation.includes(currentUserProfile.role) : true;
              }
              return false;
            })
              .filter(route => route.roles.includes(currentUserProfile.role))
              .map((route, index) => (
                <Button
                  color="inherit"
                  key={index.toString()}
                  component={NavLink}
                  to={route.path}
                  className={classes.activeLink}
                >
                  {route.label}
                </Button>
              ))}
        </Container>
      )}
    </>
  );
}
