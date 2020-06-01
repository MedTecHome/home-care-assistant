import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, makeStyles, Collapse, Container, IconButton } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { useAuthContext } from '../contexts/AuthContext';
import { getProfileByIdAction } from './Profiles/reducers/ProfileActions';
import { getPropValue } from '../helpers/utils';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#ccd5',
    padding: 0,
    position: 'relative'
  },
  collapseButton: {
    position: 'absolute',
    right: 0,
    zIndex: 1
  },
  itemTitle: {
    width: '100%',
    textAlign: 'center'
  },
  collapseItem: {
    width: '100%'
  },
  collapseContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    '& > *': {
      fontSize: '0.839rem'
    }
  }
});

function ClinicInfoComponent() {
  const { currentUser, currentUserProfile, isClinic, isDoctor, isPatient } = useAuthContext();
  const [clinicInfo, setClinicInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    async function getInformation() {
      try {
        let clinicId = null;
        if (isDoctor) {
          clinicId = getPropValue(currentUserProfile, 'parent.id');
        } else if (isPatient) {
          const doctor = await getProfileByIdAction(getPropValue(currentUserProfile, 'parent.id'));
          clinicId = getPropValue(doctor, 'parent.id');
        } else if (isClinic) {
          setClinicInfo(currentUserProfile);
          return false;
        }
        const clinic = await getProfileByIdAction(clinicId);
        setClinicInfo(clinic);
        return true;
      } catch (e) {
        throw new Error(e);
      }
    }
    if (currentUserProfile) {
      getInformation();
    }
  }, [currentUserProfile, isClinic, isDoctor, isPatient]);

  const handleOpenDetail = () => {
    setOpen(!open);
  };

  return (
    <>
      {currentUser && isClinic && isDoctor && isPatient ? (
        <List className={classes.root}>
          <IconButton className={classes.collapseButton} onClick={handleOpenDetail}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          <ListItem>
            <Typography className={classes.itemTitle} component="div">
              {getPropValue(clinicInfo, 'fullname')}
            </Typography>
          </ListItem>
          <ListItem>
            <Collapse className={classes.collapseItem} in={open} component={Container} maxWidth="sm">
              <div className={classes.collapseContent}>
                <Typography>Correo: {getPropValue(clinicInfo, 'email')}</Typography>
                <Typography>Teléfono: {getPropValue(clinicInfo, 'primaryPhone')}</Typography>
              </div>
            </Collapse>
          </ListItem>
        </List>
      ) : null}
    </>
  );
}
export default ClinicInfoComponent;
