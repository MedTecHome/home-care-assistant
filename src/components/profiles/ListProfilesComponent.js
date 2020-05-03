import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMediaQuery } from '@material-ui/core';
import { useProfilesContext } from './ProfilesContext';
import EditButtonIcon from '../buttons/EditButtonIcon';
import DeleteButtonIcon from '../buttons/DeleteButtonIcon';
import MedicalDetailButtonIcon from '../buttons/MedicalDetailButtonIcon';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
  },
  inline: {
    display: 'inline',
    lineHeight: '250%',
  },
  itemList: {
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 5,
    '&:hover': {
      background: '#f5f5f6',
    },
  },
  selectedItemList: {
    background: '#dddddd',
  },
  itemListContentPrimary: {
    maxWidth: '100%',
    lineHeight: '250%',
    fontSize: 12,
    color: '#666',
  },
  footerList: {
    height: 120,
  },
  pagination: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 10,
  },
}));

function ListProfilesComponent({ onClickDelete, onClickEdit }) {
  const history = useHistory();
  const {
    profiles,
    getProfilesList,
    selectProfileFromList,
    profileSelected,
    filters,
    loadingList,
  } = useProfilesContext();
  const [page, setPage] = React.useState({});
  const classes = useStyles();
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

  const handleOnClickMedicalHistory = id => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('pId', id);
    history.push({
      pathname: '/doctor/paciente/historial',
      search: urlSearchParams.toString(),
    });
  };

  return (
    <List className={classes.root}>
      {loadingList ? (
        <CircularProgress size={50} />
      ) : (
        profiles.map(profile => {
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
                primary={<Typography>{profile.fullname}</Typography>}
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
                            Nacio: <strong>{moment(profile.birthday.toDate()).format('DD/MM/YYYYY')}</strong>
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
                {profile.role && profile.role.id === 'patient' && (
                  <MedicalDetailButtonIcon onClick={() => handleOnClickMedicalHistory(profile.id)} />
                )}
                <EditButtonIcon onClick={() => handleOnClickEdit(profile.id)} />
                <DeleteButtonIcon onClick={() => handleOnClickDelete(profile.id)} />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      )}
      <ListItem className={classes.footerList}>
        <div className={classes.pagination}>
          {!loadingList && (
            <>
              <IconButton onClick={() => setPage({ prev: profiles[0] })}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setPage({ next: profiles[profiles.length - 1] })}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
              <Typography
                style={{
                  padding: 10,
                  color: '#666',
                }}
              >
                total: {0}
              </Typography>
            </>
          )}
        </div>
      </ListItem>
    </List>
  );
}

export default memo(ListProfilesComponent);
