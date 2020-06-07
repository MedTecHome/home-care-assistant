import React, { memo } from 'react';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import useCustomStyles from '../../jss/globalStyles';
import TypeProfileCardComponent from './TypeProfileCardComponent';

function ListProfilesComponent({
  onClickDelete,
  onClickEdit,
  selectProfileFromList,
  loadingList,
  profileList,
  profileSelected,
  isSuperadmin
}) {
  const classes = useCustomStyles();

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
            <TypeProfileCardComponent
              classes={classes}
              key={profile.id}
              profile={profile}
              isSelected={isSelected}
              isSuperadmin={isSuperadmin}
              handleOnClickDelete={handleOnClickDelete}
              handleOnClickEdit={handleOnClickEdit}
              handleSelectItemOnClick={handleSelectItemOnClick}
            />
          );
        })
      )}
    </List>
  );
}

export default memo(ListProfilesComponent);
