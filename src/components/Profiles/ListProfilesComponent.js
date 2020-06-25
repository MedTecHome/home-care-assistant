import React, { memo } from 'react';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import useCustomStyles from '../../jss/globalStyles';
import TypeProfileCardComponent from './TypeProfileCardComponent';
import { compareTrueField } from '../../helpers/utils';
import PaginationComponent from '../pagination/PaginationComponent';

const useStyles = makeStyles({
  listRoot: {
    backgroundColor: '#f6f7f9',
    padding: 0
  }
});

function ListProfilesComponent({
  onClickDelete,
  onClickEdit,
  OnEditUserPassword,
  selectProfileFromList,
  loadingList,
  profileList,
  profileSelected,
  isSuperadmin,
  total
}) {
  const classes = useCustomStyles();
  const localClasses = useStyles();

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

  const handleOnEditUserPassword = id => {
    handleSelectItemOnClick(id);
    OnEditUserPassword();
  };

  return (
    <>
      <List className={clsx(classes.root, localClasses.listRoot)}>
        {loadingList ? (
          <div className={classes.root}>
            <LinearProgress />
          </div>
        ) : (
          profileList
            .sort((a, b) => compareTrueField(a.disabled, b.disabled))
            .map(profile => {
              const isSelected = profileSelected && profileSelected.id === profile.id;
              return (
                <TypeProfileCardComponent
                  classes={classes}
                  key={profile.id}
                  profile={profile}
                  isSelected={isSelected}
                  isSuperadmin={isSuperadmin}
                  handleOnEditUserPassword={handleOnEditUserPassword}
                  handleOnClickDelete={handleOnClickDelete}
                  handleOnClickEdit={handleOnClickEdit}
                  handleSelectItemOnClick={handleSelectItemOnClick}
                />
              );
            })
        )}
      </List>
      <PaginationComponent total={total} />
    </>
  );
}

export default memo(ListProfilesComponent);
