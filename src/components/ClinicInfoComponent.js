import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  makeStyles,
  Collapse,
  IconButton,
  Avatar,
  CircularProgress
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { useAuthContext } from '../contexts/AuthContext';
import { getPropValue, isLocal, isEmpty } from '../helpers/utils';
import { getProfileById } from '../services/profiles';
import { storageFirebase } from '../firebaseConfig';

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
  itemList: {
    display: 'flex',
    margin: 'auto'
  },
  logoImg: {
    width: props => (props.open ? 64 : 34),
    height: props => (props.open ? 64 : 34),
    objectFit: 'cover',
    margin: 'auto'
  },
  itemContent: {
    padding: '0 10px'
  },
  itemTitle: {
    width: '100%',
    marginBottom: 5
  },
  collapseItem: {
    width: '100%'
  },
  collapseContent: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: 5
  },
  phonesText: {
    textAlign: 'end'
  },
  addressText: {
    gridColumn: 'span 2'
  }
});

function AsyncImageComponent({ id, className }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEmpty(id)) {
      setLoading(true);
      storageFirebase
        .ref(id)
        .getDownloadURL()
        .then(urlLink => {
          setUrl(urlLink);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Avatar variant="square" alt="" src={url} className={className}>
      {loading ? <CircularProgress size={20} /> : null}
    </Avatar>
  );
}

function ClinicInfoComponent() {
  const { currentUser, currentUserProfile, isClinic, isDoctor, isPatient } = useAuthContext();
  const [clinicInfo, setClinicInfo] = useState(null);
  const [open, setOpen] = useState(false);

  const classes = useStyles({ open });

  const isLogin = isLocal ? true : !!currentUser;

  useEffect(() => {
    async function getInformation() {
      try {
        let clinicId = null;
        if (isDoctor) {
          clinicId = getPropValue(currentUserProfile, 'parent');
        } else if (isPatient) {
          const doctor = await getProfileById(getPropValue(currentUserProfile, 'parent'));
          clinicId = getPropValue(doctor, 'parent');
        } else if (isClinic) {
          setClinicInfo(currentUserProfile);
          return false;
        }
        if (clinicId) {
          const clinic = await getProfileById(clinicId);
          setClinicInfo(clinic);
        }
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
      {isLogin && (isClinic || isDoctor || isPatient) && clinicInfo ? (
        <List className={classes.root}>
          <IconButton className={classes.collapseButton} onClick={handleOpenDetail}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          <ListItem>
            <div className={classes.itemList}>
              <AsyncImageComponent id={getPropValue(clinicInfo, 'logoUrl')} className={classes.logoImg} />
              <div className={classes.itemContent}>
                <Typography className={classes.itemTitle} component="div">
                  {getPropValue(clinicInfo, 'fullname')}
                </Typography>
                <Collapse className={classes.collapseItem} in={open}>
                  <div className={classes.collapseContent}>
                    <Typography>Correo: {getPropValue(clinicInfo, 'email')}</Typography>
                    <Typography className={classes.phonesText}>
                      Teléfonos:
                      {[getPropValue(clinicInfo, 'primaryPhone'), getPropValue(clinicInfo, 'secondaryPhone')]
                        .filter(tel => !!tel)
                        .map(tel => tel)
                        .join(', ')}
                    </Typography>
                    <Typography className={classes.addressText}>
                      Dirección:{` ${getPropValue(clinicInfo, 'address')}`}
                    </Typography>
                  </div>
                </Collapse>
              </div>
            </div>
          </ListItem>
        </List>
      ) : null}
    </>
  );
}
export default ClinicInfoComponent;
