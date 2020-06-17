import React, { useEffect, useState, useCallback } from 'react';
import {
  Typography,
  List,
  ListItem,
  makeStyles,
  Collapse,
  IconButton,
  Avatar,
  CircularProgress,
  Grid
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { useAuthContext } from '../contexts/AuthContext';
import { getPropValue, isLocal, isEmpty } from '../helpers/utils';
import { getProfileById } from '../services/profiles';
import { storageFirebase } from '../firebaseConfig';
import { useMessageContext } from '../MessageHandle/MessageContext';
import { ERROR_MESSAGE } from '../commons/globalText';

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
    marginBottom: 5,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#666',
    fontWeight: 600
  },
  collapseItem: {
    width: '100%'
  },
  collapseContent: {
    width: '100%',
    gridGap: 5
  },
  addressText: {
    gridColumn: 'span 2'
  },
  phonesText: {
    display: 'flex'
  },
  phonesNumbers: {
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'column'
  }
});

function AsyncImageComponent({ id, className }) {
  const { RegisterMessage } = useMessageContext();
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
        .catch(e => {
          RegisterMessage(ERROR_MESSAGE, e, 'ClinicalInfoComponent - logoUrl');
        })
        .finally(() => setLoading(false));
    }
  }, [id, RegisterMessage]);

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

  const getInformation = useCallback(async () => {
    if (currentUserProfile) {
      try {
        let clinicId = null;
        if (isDoctor) {
          clinicId = getPropValue(currentUserProfile, 'parent');
        } else if (isPatient) {
          const doctor = await getProfileById(getPropValue(currentUserProfile, 'parent'));
          clinicId = getPropValue(doctor, 'parent');
        } else if (isClinic) {
          setClinicInfo(currentUserProfile);
        }
        if (clinicId) {
          const clinic = await getProfileById(clinicId);
          setClinicInfo(clinic);
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  }, [currentUserProfile, isClinic, isDoctor, isPatient]);

  useEffect(() => {
    getInformation();
  }, [getInformation]);

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
                <Typography className={classes.itemTitle} variant="h6">
                  {getPropValue(clinicInfo, 'fullname')}
                </Typography>
                <Collapse className={classes.collapseItem} in={open}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Typography>Correo: {getPropValue(clinicInfo, 'email')}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography component="div" className={classes.phonesText}>
                        <span>Teléfonos:</span>
                        <div className={classes.phonesNumbers}>
                          <span>{getPropValue(clinicInfo, 'primaryPhone')}</span>
                          <span>{getPropValue(clinicInfo, 'secondaryPhone')}</span>
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className={classes.addressText}>
                        Dirección:{` ${getPropValue(clinicInfo, 'address') || '-'}`}
                      </Typography>
                    </Grid>
                  </Grid>
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
