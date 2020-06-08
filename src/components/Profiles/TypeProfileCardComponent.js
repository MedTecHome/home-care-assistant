import React from 'react';
import { Avatar, ListItem, useMediaQuery, Typography, makeStyles, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import MedicalDetailButtonIcon from '../buttons/MedicalDetailButtonIcon';
import EditButtonIcon from '../buttons/EditButtonIcon';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import { getPropValue } from '../../helpers/utils';
import PopoverComponent from '../containers/PopoverComponent';

const useStyles = makeStyles({
  itemList: {
    display: 'flex',
    justifyContent: 'stretch'
  },
  avatarInCard: {
    margin: 'auto 10px'
  },
  actionContent: {
    margin: 'auto',
    display: 'grid'
  }
});

function TypeProfileCardComponent({
  profile,
  classes,
  isSelected,
  handleSelectItemOnClick,
  handleOnClickEdit,
  handleOnClickDelete,
  isSuperadmin
}) {
  const localClass = useStyles();
  const up600 = useMediaQuery(theme => theme.breakpoints.up(600));
  const up450 = useMediaQuery(theme => theme.breakpoints.up(450));
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
        <Avatar alt={profile.name} />
      </div>
      <Grid container alignItems="flex-start" spacing={1} justify="space-between" direction="row">
        <Grid item xs={12} sm={4}>
          <div className={localClass.addressText}>
            <Typography component="div" className={clsx(classes.itemListContentPrimary)}>
              <strong>{`${profile.name} ${profile.lastName}`}</strong>
            </Typography>
            {isSuperadmin && (
              <Typography component="div" variant="body2" className={classes.inline} color="textPrimary">
                Tipo: <strong>{profile.role ? profile.role.name : '-'}</strong>
              </Typography>
            )}
            {['clinic', 'patient'].includes(getPropValue(profile, 'role')) ? (
              <Typography component="div" className={clsx(classes.itemListContentPrimary)}>
                {profile.address ? (
                  <PopoverComponent
                    header="Dirección"
                    label="Dirección"
                    title={profile.address}
                    content={profile.address}
                  />
                ) : (
                  '-'
                )}
              </Typography>
            ) : null}
          </div>
        </Grid>
        {up600 && (
          <Grid item xs={4}>
            <div>
              <Typography component="div" className={classes.itemListContentPrimary}>
                {(getPropValue(profile, 'role') === 'patient' && getPropValue(profile, 'birthday') && (
                  <>
                    Nació: <strong>{getPropValue(profile, 'birthday') || ''}</strong>
                  </>
                )) ||
                  (getPropValue(profile, 'role') === 'clinic' && (
                    <>
                      Max. Doctores: <strong>{getPropValue(profile, 'maxDoctors')}</strong>
                    </>
                  ))}
              </Typography>
              <Typography component="div" className={classes.itemListContentPrimary}>
                {profile.role && profile.role === 'patient' && (
                  <>
                    Edad: <strong>{profile.age}</strong>
                  </>
                )}
              </Typography>
            </div>
          </Grid>
        )}
        {up450 && (
          <Grid item xs={12} sm={4}>
            <div>
              <Typography className={classes.itemListContentPrimary}>
                Correo: {profile.email && <strong>{profile.email}</strong>}
              </Typography>
              <Typography className={classes.itemListContentPrimary}>
                Teléfono: {profile.primaryPhone && <strong>{profile.primaryPhone}</strong>}
              </Typography>
            </div>
          </Grid>
        )}
      </Grid>
      <div className={localClass.actionContent}>
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
