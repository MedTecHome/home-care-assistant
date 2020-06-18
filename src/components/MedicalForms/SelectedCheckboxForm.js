import React from 'react';
import {
  FormControlLabel,
  Checkbox,
  Typography,
  makeStyles,
  Button,
  MenuList,
  MenuItem,
  useMediaQuery,
  Menu,
  IconButton
} from '@material-ui/core';
import { Close as CloseIcon, Menu as MenuIcon } from '@material-ui/icons';
import { testFormsNames } from '../../helpers/constants';
import IconTestComponent from '../ClinicalHistory/IconTestComponent';

const useStyles = makeStyles(theme => ({
  iconSize: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  textIconLabel: {
    display: 'flex'
  },
  popperRoot: {
    zIndex: 100,
    [theme.breakpoints.down('sm')]: {}
  },
  paperRoot: {
    backgroundColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'white'
    }
  },
  menuHandleTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuTitle: {
    flexGrow: 1
  }
}));

function TestsMenuComponent({ match, anchorEl, handleClose, defaultValues, onCheckboxChange, classes }) {
  const childMenu = (
    <div>
      <MenuItem className={classes.menuHandleTitle}>
        <Typography variant="h5" className={classes.menuTitle}>
          Seleccione
        </Typography>
        {match && (
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        )}
      </MenuItem>
      {testFormsNames.map(value => (
        <MenuItem key={value.id}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onChange={({ target: { checked, name } }) => onCheckboxChange(checked, name)}
                checked={defaultValues.includes(value.id)}
                name={value.id}
              />
            }
            label={
              <div className={classes.textIconLabel}>
                <IconTestComponent type={value.id} className={classes.iconSize} />
                <Typography variant="button">{`${value.name}`}</Typography>
              </div>
            }
          />
        </MenuItem>
      ))}
    </div>
  );

  return (
    <>
      {match ? (
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {childMenu}
        </Menu>
      ) : (
        <MenuList id="simple-menu" open={Boolean(anchorEl)} onClose={handleClose}>
          {childMenu}
        </MenuList>
      )}
    </>
  );
}

function SelectedChecboxForm({ defaultValues, onCheckboxChange }) {
  const classes = useStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {match ? (
        <>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon />
            Menu de Pruebas
          </Button>
          <TestsMenuComponent
            match={match}
            anchorEl={anchorEl}
            defaultValues={defaultValues}
            onCheckboxChange={onCheckboxChange}
            classes={classes}
            handleClose={handleClose}
          />
        </>
      ) : (
        <TestsMenuComponent
          match={match}
          anchorEl
          defaultValues={defaultValues}
          onCheckboxChange={onCheckboxChange}
          classes={classes}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default SelectedChecboxForm;
