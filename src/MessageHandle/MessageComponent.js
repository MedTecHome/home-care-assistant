import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useMessageContext } from './MessageContext';
import { getPropValue, isEmpty } from '../helpers/utils';
import { useAuthContext } from '../contexts/AuthContext';

function Alert({ children, severity, onClose, variant = 'filled' }) {
  return (
    <MuiAlert elevation={6} variant={variant} severity={severity} onClose={onClose}>
      {children}
    </MuiAlert>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function MessageComponent() {
  const { currentUser } = useAuthContext();
  const { messages, clearMessages } = useMessageContext();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!isEmpty(messages)) {
      setOpen(true);
    }
  }, [messages]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    clearMessages();
  };

  return (
    <>
      {currentUser && (
        <div className={classes.root}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            {messages && messages.type && (
              <Alert onClose={handleClose} severity={messages.type}>
                <Typography>{getPropValue(messages, 'message.message')}</Typography>
              </Alert>
            )}
          </Snackbar>
        </div>
      )}
    </>
  );
}
