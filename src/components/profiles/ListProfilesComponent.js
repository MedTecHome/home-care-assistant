import React, { memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import moment from 'moment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useMediaQuery } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useProfilesContext } from './ProfilesContext';
import EditButtonIcon from '../buttons/EditButtonIcon';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import MedicalDetailButtonIcon from '../buttons/MedicalDetailButtonIcon';
import useCustomStyles from '../../jss/globalStyles';
import AsignTreatmentButtonIcon from '../buttons/AsignTreatmentButtonIcon';
import { ADD_FORM_TEXT } from '../../commons/globalText';

function ListProfilesComponent({ onClickDelete, onClickEdit }) {
  const {
    profileList,
    getProfilesList,
    selectProfileFromList,
    profileSelected,
    filters,
    loadingList
  } = useProfilesContext();
  const [page, setPage] = React.useState({});
  const classes = useCustomStyles();
  const up500 = useMediaQuery(theme => theme.breakpoints.up(500));
  const up400 = useMediaQuery(theme => theme.breakpoints.up(400));

  useEffect(() => {
    getProfilesList({ filters, ...page });
  }, [getProfilesList, filters, page]);

  const handleSelectItemOnClick = id => {
    selectProfileFromList(id);
  };

  const handleOnClickDelete = id => {
    handleSelectItemOnClick(id);
    onClickDelete();
  };

  const handleOnClickEdit = id => {
    handleSelectItemOnClick(id);
    onClickEdit();
  };

  return (
    <List className={classes.root}>
      {loadingList ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        profileList.map(profile => {
          const isSelected = profileSelected && profileSelected.id === profile.id;
          return (
            <ListItem
              key={profile.id}
              onClick={() => handleSelectItemOnClick(profile.id)}
              alignItems="flex-start"
              className={clsx(classes.itemList, isSelected && classes.selectedItemList)}
              divider
            >
              <ListItemAvatar>
                <Avatar alt={profile.name} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography>{`${profile.name} ${profile.lastName}`}</Typography>}
                secondary={
                  <>
                    <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                      Tipo: <strong>{profile.role ? profile.role.name : '?'}</strong>
                    </Typography>
                  </>
                }
              />
              {up500 && (
                <ListItemText
                  primary={
                    <>
                      <Typography className={classes.itemListContentPrimary}>
                        {profile.role && profile.role.id === 'patient' && profile.birthday && (
                          <>
                            Nació: <strong>{moment(profile.birthday.toDate()).format('DD/MM/YYYYY')}</strong>
                          </>
                        )}
                        {profile.role && profile.role.id === 'doctor' && (
                          <>Hospital: {profile.hospital && <strong>{profile.hospital.name}</strong>}</>
                        )}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Typography className={classes.itemListContentPrimary}>
                      {profile.role && profile.role.id === 'patient' && (
                        <>
                          Estatura: <strong>{profile.height}</strong>
                        </>
                      )}
                    </Typography>
                  }
                />
              )}
              {up400 && (
                <ListItemText
                  primary={
                    <Typography className={classes.itemListContentPrimary}>
                      Correo: {profile.user && <strong>{profile.user.email}</strong>}
                    </Typography>
                  }
                />
              )}
              <ListItemSecondaryAction>
                <div>
                  {profile.role && profile.role.id === 'patient' && (
                    <>
                      <NavLink to={{ pathname: '/detallesclinicos', state: { profile } }}>
                        <MedicalDetailButtonIcon />
                      </NavLink>
                    </>
                  )}
                  <EditButtonIcon onClick={() => handleOnClickEdit(profile.id)} />
                  <DeleteButtonIcon onClick={() => handleOnClickDelete(profile.id)} />
                </div>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      )}
      <ListItem className={classes.footerList}>
        <div className={classes.pagination}>
          {!loadingList && (
            <>
              <IconButton onClick={() => setPage({ prev: profileList[0] })}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setPage({ next: profileList[profileList.length - 1] })}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </div>
      </ListItem>
    </List>
  );
}

export default memo(ListProfilesComponent);
