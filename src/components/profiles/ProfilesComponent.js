import React, { useCallback, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useProfilesContext, withProfileContext } from './ProfilesContext';
import ListProfilesComponent from './ListProfilesComponent';
import ToolbarProfileComponent from './FiltersProfilesComponent';
import ModalComponent from '../ModalComponent';
import ProfilesFormComponent from './forms/ProfilesFormsComponent';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import useCustomStyles from '../../jss/globalStyles';

function ProfilesComponent() {
  const {
    formType,
    setModalVisible,
    modalVisible,
    selectProfileFromList,
    getProfilesList,
    filters,
    setFilters,
  } = useProfilesContext();
  const classes = useCustomStyles();

  useEffect(() => {
    setFilters({
      'role.id': 'doctor',
    });
  }, [setFilters]);

  const handleBackdropClick = () => {
    setModalVisible(false, null);
  };

  const handleLoadList = useCallback(() => {
    getProfilesList({ filters });
    selectProfileFromList(null);
  }, [filters, getProfilesList, selectProfileFromList]);

  const handleOnClickDelete = () => {
    setModalVisible(true, DELETE_FORM_TEXT);
  };

  const handleOnClickEdit = () => {
    setModalVisible(true, EDIT_FORM_TEXT);
  };

  const handleOnClickAdd = () => {
    setModalVisible(true, ADD_FORM_TEXT);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} onBackdropClick={handleBackdropClick}>
        <ProfilesFormComponent formType={formType} handleModalClose={handleLoadList} />
      </ModalComponent>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary" variant="h5" className={classes.pageHeader}>
          Todos
        </Typography>
      </Breadcrumbs>
      <ToolbarProfileComponent onClickAdd={handleOnClickAdd} />
      <ListProfilesComponent onClickDelete={handleOnClickDelete} onClickEdit={handleOnClickEdit} />
    </>
  );
}

export default withProfileContext(ProfilesComponent);
