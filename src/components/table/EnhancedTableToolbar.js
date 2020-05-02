import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { ADD_FORM_TEXT } from '../../commons/globalText';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  buttons: {
    flex: '1',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { filters, onAdd } = props;

  const handleAddItem = () => {
    onAdd(ADD_FORM_TEXT);
  };

  return (
    <Toolbar>
      <div className={classes.buttons}>
        <IconButton
          className={classes.buttonAdd}
          variant="contained"
          color="primary"
          arial-label="add"
          onClick={handleAddItem}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
      <div className={classes.filters}>{filters}</div>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
