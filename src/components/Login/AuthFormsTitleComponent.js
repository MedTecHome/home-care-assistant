import React from 'react';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  loginFormTitle: {
    color: '#666',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold'
  }
}));

export default function AuthFormsTitle({ title }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={classes.loginFormTitle} variant="subtitle1">
        {title}
      </Typography>
    </div>
  );
}
