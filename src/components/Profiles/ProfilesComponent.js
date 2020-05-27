import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useProfilesContext, withProfileContext } from './ProfilesContext';
import ListProfilesComponent from './ListProfilesComponent';
import ToolbarProfileComponent from './FiltersProfilesComponent';
import ModalComponent from '../ModalComponent';
import ProfilesFormComponent from './forms/ProfilesFormsComponent';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../commons/globalText';
import useCustomStyles from '../../jss/globalStyles';
import { withCustomPaginationContext, useCustomPaginationContext } from '../pagination/PaginationContext';
import { getPropValue } from '../../helpers/utils';
import PaginationComponent from '../pagination/PaginationComponent';

function ProfilesComponent() {
  const { pageSize, offset } = useCustomPaginationContext();
  const {
    formType,
    setModalVisible,
    modalVisible,
    setParams,
    profileList,
    total,
    selectProfileFromList,
    profileSelected,
    loadingList
  } = useProfilesContext();
  const classes = useCustomStyles();

  useEffect(() => {
    setParams({ limit: pageSize, offset });
  }, [setParams, pageSize, offset]);

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
      <ModalComponent visible={modalVisible}>
        <ProfilesFormComponent formType={formType} />
      </ModalComponent>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary" variant="h5" className={classes.pageHeader}>
          Todos
        </Typography>
      </Breadcrumbs>
      <ToolbarProfileComponent onClickAdd={handleOnClickAdd} />
      <Typography>
        <strong>Total: </strong>({total})
      </Typography>
      <ListProfilesComponent
        loadingList={loadingList}
        profileList={profileList}
        profileSelected={profileSelected}
        selectProfileFromList={selectProfileFromList}
        onClickDelete={handleOnClickDelete}
        onClickEdit={handleOnClickEdit}
      />
      <PaginationComponent
        total={total}
        first={getPropValue(profileList[0], 'fullname')}
        last={getPropValue(profileList[profileList.length - 1], 'fullname')}
      />
    </>
  );
}

export default withCustomPaginationContext(withProfileContext(ProfilesComponent));
