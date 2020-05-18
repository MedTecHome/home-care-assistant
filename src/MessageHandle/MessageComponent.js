import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { useMessageContext } from './MessageContext';
import { getPropValue, isEmpty } from '../helpers/utils';
import { useAuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  messageText: {
    maxWidth: 200,
    maxHeight: 48,
    overflow: 'hidden',
    textOverflow: 'ellipsi',
    /* word-break: break-word; */
    /* text-align: justify; */
    fontSize: '0.849rem',
    alignSelf: 'center'
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
            <Alert variant="filled" onClose={handleClose} severity={getPropValue(messages, 'type') || 'error'}>
              <Typography className={classes.messageText}>{`${
                getPropValue(messages, 'message') || 'A ocurrido un error interno.'
              }`}</Typography>
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
}
