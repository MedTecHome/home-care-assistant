import React, { memo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { useProfilesContext } from '../../contexts/ProfilesContext';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  itemList: {
    cursor: 'pointer',
    '&:hover': {
      background: '#f5f5f6',
    },
  },
  selectedItemList: {
    background: '#dddddd',
  },
  itemListContentPrimary: {
    maxWidth: '100%',
    lineHeight: 2,
    fontSize: 10,
    color: '#6f6f6f',
  },
}));

function ListProfilesComponent({ userRole, onClickDelete, onClickEdit }) {
  const { profiles, getProfilesList, selectProfileFromList, profileSelected, rolesProfile } = useProfilesContext();
  const classes = useStyles();

  useEffect(() => {
    getProfilesList(userRole ? { roleId: userRole } : {});
  }, [getProfilesList]);

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
      {profiles.map(profile => {
        const isSelected = profileSelected && profileSelected.id === profile.id;
        const role = rolesProfile.find(r => r.id === profile.roleId);
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
              primary={
                <Grid container spacing={5}>
                  <Grid item xs={3} container>
                    <Typography>{`${profile.name} ${profile.lastName} `}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography className={classes.itemListContentPrimary}>
                      Nacio: {moment(profile.birthday.toDate()).format('DD/MM/YYYYY')}
                    </Typography>
                    <Typography className={classes.itemListContentPrimary}>Estatura: {profile.height}</Typography>
                  </Grid>
                </Grid>
              }
              secondary={
                <>
                  <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                    Tipo: {role ? role.name : '?'}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleOnClickEdit(profile.id)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleOnClickDelete(profile.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default memo(ListProfilesComponent);
