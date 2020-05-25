import React, { useEffect, useMemo, useState, memo } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import {
  Done as DoneIcon,
  Close as CloseIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@material-ui/icons';
import { ButtonBase, InputBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { withMedicinesContext } from '../../Medicines/MedicinesContext';
import { getMedicinesListAction } from '../../Medicines/actions/MedicinesActions';
import useDebounceCustom from '../../../commons/useDebounceCustom';
import { getPropValue } from '../../../helpers/utils';
import MedicineDetailItemListComponent from '../../Medicines/MedicineDetailItemListComponent';
import { useAuthContext } from '../../../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 14
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #ccc',
    borderRadius: 3,
    fontSize: 13,
    width: '100%',
    textAlign: 'left',
    padding: 6,
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

function MedicinesFieldComponent({
  required,
  label,
  setMedicine,
  errors,
  defaultValue = [],
  medicineSelected,
  setSelectedMedicine,
  medicineEdited,
  setMedicineEdited
}) {
  const [medicines, setMedicines] = useState([]);
  const [filterName, setFilterName] = useState('');
  const debounceValue = useDebounceCustom(filterName, 500);
  const filterNameMemoize = useMemo(() => debounceValue, [debounceValue]);
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [pendingValue, setPendingValue] = React.useState(value);

  const {
    currentUserProfile: { hospital }
  } = useAuthContext();

  const classes = useStyles();

  useEffect(() => {
    setMedicine(
      value.map(medicine => ({
        ...medicine,
        concentrationType: getPropValue(medicine, 'concentrationType.id') || medicine.concentrationType,
        doseType: getPropValue(medicine, 'doseType.id') || medicine.doseType,
        administrationType: getPropValue(medicine, 'administrationType.id') || medicine.administrationType
      }))
    );
  }, [setMedicine, value]);

  useEffect(() => {
    if (medicineEdited) {
      const result = value.map(medicine =>
        medicine.id === medicineEdited.id ? { ...medicineEdited, edited: true } : medicine
      );
      setValue(result);
      setMedicineEdited(null);
      setSelectedMedicine(null);
    }
  }, [value, medicineEdited, setMedicineEdited, setSelectedMedicine]);

  useEffect(() => {
    getMedicinesListAction({
      limit: 5,
      filters: { 'hospital.id': hospital.id, ...(filterNameMemoize ? { name: filterNameMemoize } : {}) }
    }).then(result => setMedicines(result.data.data));
  }, [filterNameMemoize, hospital]);

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
    setSelectedMedicine(medicine);
  };

  return (
    <>
      <div className={classes.root}>
        <ButtonBase disableRipple className={classes.button} onClick={handleClick} color="primary">
          <span>
            {label} {required && '*'}
          </span>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ButtonBase>
        {!open && (
          <MedicineDetailItemListComponent
            selected={medicineSelected}
            medicines={value}
            handleEditMedicine={handleEditMedicine}
          />
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

export default withMedicinesContext(memo(MedicinesFieldComponent));
