import React, { useState } from 'react';
import { Avatar, ListItem, Typography, makeStyles, useMediaQuery } from '@material-ui/core';
import moment from 'moment';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import MedicalDetailButtonIcon from '../buttons/MedicalDetailButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import { getPropValue, isEmpty } from '../../helpers/utils';
import PopoverComponent from '../containers/PopoverComponent';
import { storageFirebase } from '../../firebaseConfig';
import EditUserPasswordIcon from '../buttons/EditUserPasswordIcon';

const useStyles = makeStyles(theme => ({
  itemList: {
    display: 'flex',
    justifyContent: 'stretch'
  },
  avatarInCard: {
    margin: 'auto 10px'
  },
  avatarImg: {
    width: 64,
    height: 64
  },
  contentItemList: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
    gridGap: '1rem',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`
    }
  },
  actionContent: {
    alignSelf: 'center',
    display: 'grid'
  },
  phonesText: {
    display: 'flex'
  },
  phonesNumbers: {
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'column'
  }
}));

function TypeProfileCardComponent({
  profile,
  classes,
  isSelected,
  handleSelectItemOnClick,
  handleOnClickEdit,
  handleOnClickDelete,
  handleOnEditUserPassword,
  isSuperadmin
}) {
  const [logo, setLogo] = useState('');
  const localClass = useStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  useState(() => {
    const logoUrl = profile.role === 'clinic' ? profile.logoUrl : '';
    if (!isEmpty(logoUrl)) {
      storageFirebase
        .ref()
        .child(logoUrl)
        .getDownloadURL()
        .then(url => {
          setLogo(url);
        });
    }
  }, [profile.logoUrl]);

  return (
    <ListItem
      key={profile.id}
      disableGutters
      onClick={() => handleSelectItemOnClick(profile.id)}
      alignItems="flex-start"
      className={clsx(classes.itemList, isSelected && classes.selectedItemList, localClass.itemList)}
      divider
    >
      <div className={localClass.avatarInCard}>
        <Avatar alt={profile.name} src={logo} className={localClass.avatarImg} />
      </div>
      <div className={localClass.contentItemList}>
        <Typography component="div">
          <strong>{`${profile.name} ${profile.lastName || ''}`}</strong>
        </Typography>
        {isSuperadmin && (
          <Typography component="div" variant="body2" className={classes.inline} color="textPrimary">
            Tipo:<strong>{` ${profile.role ? profile.role.name : '-'}`}</strong>
          </Typography>
        )}
        {!match && getPropValue(profile, 'role') === 'patient' && getPropValue(profile, 'birthday') && (
          <Typography component="div">
            Nació:
            <strong>
              {` ${
                getPropValue(profile, 'birthday')
                  ? moment(getPropValue(profile, 'birthday')).format('DD [de] MMM, YYYY')
                  : ''
              }`}
            </strong>
          </Typography>
        )}
        {getPropValue(profile, 'role') === 'clinic' && (
          <Typography>
            Límite Doctores:
            <strong>{` ${getPropValue(profile, 'realDoctors')}/${getPropValue(profile, 'maxDoctors')}`}</strong>
          </Typography>
        )}
        {!match && profile.role && profile.role === 'patient' && (
          <Typography component="div">
            Edad:<strong>{` ${profile.age || 0} años`}</strong>
          </Typography>
        )}
        {['clinic', 'patient'].includes(getPropValue(profile, 'role')) && profile.address ? (
          <PopoverComponent header="Dirección" label="Dirección" title={profile.address} content={profile.address} />
        ) : null}
        <Typography>
          Correo: <strong> {profile.email && profile.emailVisible ? profile.email : '-'}</strong>
        </Typography>
        <Typography component="div" className={localClass.phonesText}>
          <span>Teléfonos:</span>
          <div className={localClass.phonesNumbers}>
            <strong>{profile.phoneVisible ? profile.primaryPhone : null}</strong>
            <strong>{profile.phoneSecondaryVisible ? profile.secondaryPhone : null}</strong>
          </div>
        </Typography>
      </div>
      <div className={localClass.actionContent}>
        <EditUserPasswordIcon onClick={() => handleOnEditUserPassword(profile.id)} />
        {profile.role && profile.role === 'patient' && (
          <NavLink to={{ pathname: '/detallesclinicos', state: { profile } }}>
            <MedicalDetailButtonIcon />
          </NavLink>
        )}
        <EditButtonIcon onClick={() => handleOnClickEdit(profile.id)} />
        <DeleteButtonIcon onClick={() => handleOnClickDelete(profile.id)} />
      </div>
    </ListItem>
  );
}

export default TypeProfileCardComponent;
