import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { HomeRounded as HomeIcon } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Catch from './functional-error-boundary';
import { getPropValue } from '../helpers/utils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    margin: '10% auto',
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: fade(theme.palette.secondary.light, 0.5),
    padding: 24,
    color: theme.palette.secondary.main
  },
  title: {
    textAlign: 'center',
    fontSize: 27,
    fontWeight: 600
  },
  content: {},
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

function ErrorBoundaryMessageComponent({ error }) {
  const history = useHistory();
  const classes = useStyles();

  const handleBack = () => {
    history.push('/inicio');
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.title}>
        A ocurrido un error
      </Typography>
      <h4 className={classes.content}>
        {getPropValue(error, 'message') ||
          'Por favor contacte con el administrador del sistema para mas detalles del mismo.'}
      </h4>
      <div className={classes.actions}>
        <Tooltip title="Atras">
          <IconButton onClick={handleBack} color="secondary">
            <HomeIcon color="secondary" fontSize="large" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

const CustomBoundary = Catch((props, error) => {
  if (error) {
    return <ErrorBoundaryMessageComponent error={error} />;
  }
  // return <ErrorBoundaryMessageComponent error={error} />;
  return <>{props.children}</>;
});

export default CustomBoundary;
