import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { ADD_FORM_TEXT } from '../../commons/globalText';
import AddButtonIcon from '../buttons/AddButtonIcon';

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
        <AddButtonIcon onClick={handleAddItem} size="lg" />
      </div>
      <div className={classes.filters}>{filters}</div>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
