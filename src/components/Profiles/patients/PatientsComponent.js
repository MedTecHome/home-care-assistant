import React, { useEffect } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import ModalComponent from '../../ModalComponent';
import { useProfilesContext, withProfileContext } from '../ProfilesContext';
import ProfilesFormComponent from '../forms/ProfilesFormsComponent';
import ListProfilesComponent from '../ListProfilesComponent';
import ToolbarProfileComponent from '../FiltersProfilesComponent';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../../../commons/globalText';
import { useAuthContext } from '../../../contexts/AuthContext';
import useCustomStyles from '../../../jss/globalStyles';

function PatientsComponent() {
  const { setModalVisible, modalVisible, formType, setFilters } = useProfilesContext();
  const { currentUserProfile } = useAuthContext();
  const classes = useCustomStyles();

  useEffect(() => {
    if (formType === null) {
      setFilters({
        'role.id': 'patient',
        ...(currentUserProfile ? { 'doctor.id': currentUserProfile.id } : {})
      });
    }
  }, [setFilters, currentUserProfile, formType]);

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
          Pacientes
        </Typography>
      </Breadcrumbs>
      <ToolbarProfileComponent onClickAdd={handleOnClickAdd} />
      <ListProfilesComponent onClickDelete={handleOnClickDelete} onClickEdit={handleOnClickEdit} />
    </>
  );
}

export default withProfileContext(PatientsComponent);
