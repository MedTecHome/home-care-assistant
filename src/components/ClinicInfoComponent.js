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
  Grid,
  Paper
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
    width: 128,
    height: 128,
    objectFit: 'cover',
    margin: 'auto'
  },
  itemContent: {
    padding: '0 10px',
    alignSelf: 'center'
  },
  itemTitle: {
    width: '100%',
    marginBottom: 5,
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
    <Paper>
      {isLogin && (isClinic || isDoctor || isPatient) && clinicInfo ? (
        <List className={classes.root}>
          <IconButton className={classes.collapseButton} onClick={handleOpenDetail}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          <ListItem>
            <div className={classes.itemList}>
              <AsyncImageComponent id={getPropValue(clinicInfo, 'logoUrl')} className={classes.logoImg} />
              <div className={classes.itemContent}>
                <Typography className={classes.itemTitle} variant={open ? 'h6' : 'h5'}>
                  {`${getPropValue(clinicInfo, 'name') || ''} ${getPropValue(clinicInfo, 'lastName') || ''}`}
                </Typography>
                <Collapse className={classes.collapseItem} in={open}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <strong>{`Correo: `}</strong> {`${getPropValue(clinicInfo, 'email') || ''}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography component="div" className={classes.phonesText}>
                        <strong>{`Teléfonos: `}</strong>
                        <div className={classes.phonesNumbers}>
                          <span>{getPropValue(clinicInfo, 'primaryPhone') || ''}</span>
                          <span>{getPropValue(clinicInfo, 'secondaryPhone') || ''}</span>
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className={classes.addressText}>
                        <strong>{`Dirección: `}</strong>
                        {`${getPropValue(clinicInfo, 'address') || '-'}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Collapse>
              </div>
            </div>
          </ListItem>
        </List>
      ) : null}
    </Paper>
  );
}
export default ClinicInfoComponent;
