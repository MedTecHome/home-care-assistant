import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import HomeCareIco from '../../images/homeCareIco.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    width: 74
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
      <div>
        <img alt="" src={HomeCareIco} className={classes.avatar} />
      </div>
      <Typography className={classes.loginFormTitle} variant="subtitle1">
        {title}
      </Typography>
    </div>
  );
}
