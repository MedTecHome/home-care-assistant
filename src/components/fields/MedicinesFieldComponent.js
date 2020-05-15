import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Settings as SettingsIcon, Done as DoneIcon, Close as CloseIcon } from '@material-ui/icons';
import { ButtonBase, InputBase, ListItemSecondaryAction } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withMedicinesContext } from '../Medicines/MedicinesContext';
import { getMedicinesListAction } from '../Medicines/reducers/MedicinesActions';
import useDebounceCustom from '../../commons/useDebounceCustom';
import EditButtonIcon from '../buttons/EditButtonIcon';
import ModalComponent from '../ModalComponent';
import { AddOrEditMedicineForm } from '../Medicines/forms/AddOrEditMedicineComponent';
import { EDIT_FORM_TEXT } from '../../commons/globalText';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 14
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ccc',
    fontSize: 13,
    width: '100%',
    textAlign: 'left',
    paddingBottom: 8,
    color: '#586069',
    fontWeight: 600,
    '&:hover,&:focus': {
      color: '#0366d6'
    },
    '& span': {
      width: '100%'
    },
    '& svg': {
      width: 16,
      height: 16
    }
  },
  tag: {
    marginTop: 3,
    padding: '.15em 4px',
    fontWeight: 600,
    lineHeight: '15px',
    borderRadius: 2,
    borderBottom: '1px solid #ccc'
  },
  listText: {
    maxWidth: '90%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  popper: {
    border: '1px solid rgba(27,31,35,.15)',
    borderRadius: 3,
    fontSize: 14,
    color: '#586069'
  },
  header: {
    borderBottom: '1px solid #e1e4e8',
    padding: '8px 10px',
    fontWeight: 600
  },
  inputBase: {
    padding: 10,
    width: '100%',
    borderBottom: '1px solid #dfe2e5',
    '& input': {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      border: '1px solid #ced4da',
      fontSize: 14,
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      }
    }
  },
  paper: {
    boxShadow: 'none',
    margin: 0,
    color: '#586069',
    fontSize: 14
  },
  option: {
    minHeight: 'auto',
    alignItems: 'flex-start',
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: 'transparent'
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover
    }
  },
  popperDisablePortal: {
    position: 'relative'
  },
  iconSelected: {
    width: 17,
    height: 17,
    marginRight: 5,
    marginLeft: -2
  },
  color: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2
  },
  text: {
    flexGrow: 1
  },
  close: {
    opacity: 0.6,
    width: 18,
    height: 18
  }
}));

function MedicinesFieldComponent({ required, label, setMedicine, errors, defaultValue = [] }) {
  const [medicines, setMedicines] = useState([]);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [pendingValue, setPendingValue] = React.useState(value);
  const [medicineSelected, setMedicineSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    return () => {
      setMedicines([]);
      setMedicine([]);
      setFilterName('');
      setValue([]);
      setMedicineSelected(null);
      setModalVisible(false);
      setPendingValue([]);
      setOpen(false);
    };
  }, [setMedicine]);

  useEffect(() => {
    setMedicine(value);
  }, [setMedicine, value]);

  useEffect(() => {
    getMedicinesListAction({
      limit: 5,
      filters: { ...(filterNameMemoize ? { name: filterNameMemoize } : {}) }
    }).then(result => setMedicines(result));
  }, [filterNameMemoize]);

  const handleClick = () => {
    setPendingValue(value);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'toggleInput') {
      return;
    }
    setValue(pendingValue);
    setOpen(false);
  };

  const handleChange = event => {
    setFilterName(event.target.value);
  };

  const handleEditMedicine = medicine => {
    setModalVisible(true);
    setMedicineSelected(medicine);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setMedicineSelected(null);
  };

  const handleMedicineValues = values => {
    const result = value.map(medicine => (medicine.id === values.id ? values : medicine));
    setValue(result);
    setModalVisible(false);
    setMedicineSelected(null);
  };

  return (
    <>
      <ModalComponent visible={modalVisible}>
        <AddOrEditMedicineForm
          formType={EDIT_FORM_TEXT}
          onSubmit={handleMedicineValues}
          selected={medicineSelected}
          handleCloseForm={handleCloseModal}
        />
      </ModalComponent>
      <div className={classes.root}>
        <ButtonBase disableRipple className={classes.button} onClick={handleClick} color="primary">
          <span>
            {label} {required && '*'}
          </span>
          <SettingsIcon />
        </ButtonBase>
        {!open && (
          <List>
            {value.map(medicine => (
              <ListItem key={medicine.id} className={classes.tag}>
                <ListItemText primary={<Typography className={classes.listText}>{medicine.name}</Typography>} />
                <ListItemSecondaryAction>
                  <EditButtonIcon onClick={() => handleEditMedicine(medicine)} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        <Typography>{errors}</Typography>
      </div>
      {open && (
        <div className={classes.popper}>
          <div className={classes.header}>Seleccionar medicamentos</div>
          <Autocomplete
            open
            onClose={handleClose}
            multiple
            classes={{
              paper: classes.paper,
              option: classes.option,
              popperDisablePortal: classes.popperDisablePortal
            }}
            value={pendingValue}
            onChange={(event, newValue) => {
              setPendingValue(newValue);
            }}
            getOptionSelected={(option, value1) => option.id === value1.id}
            onInputChange={handleChange}
            disableCloseOnSelect
            disablePortal
            renderTags={() => null}
            noOptionsText="No labels"
            renderOption={(option, { selected }) => (
              <>
                <DoneIcon className={classes.iconSelected} style={{ visibility: selected ? 'visible' : 'hidden' }} />
                <span className={classes.color} style={{ backgroundColor: option.color }} />
                <div className={classes.text}>
                  {option.name}
                  <br />
                  {option.description}
                </div>
                <CloseIcon className={classes.close} style={{ visibility: selected ? 'visible' : 'hidden' }} />
              </>
            )}
            options={medicines}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <InputBase
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                className={classes.inputBase}
              />
            )}
          />
        </div>
      )}
    </>
  );
}

export default withMedicinesContext(MedicinesFieldComponent);
