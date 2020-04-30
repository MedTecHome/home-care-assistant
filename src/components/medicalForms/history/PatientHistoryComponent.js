import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { usePatientHistoryContext, withPatientHistoryContext } from './PatientHistoryContext';
import ListPatientHistoryComponent from './ListPatientHistoryComponent';
import FiltersPatientHistoryComponent from './FiltersPatientHistoryComponent';
import ModalComponent from '../../ModalComponent';
import DetailHistoryMedicalFormComponent from './DetailHistoryMedicalFormComponent';
import { AuthContext } from '../../../contexts/AuthContext';

function PatientHistoryComponent() {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const { getPatientHistory, modalVisible, setModalVisible } = usePatientHistoryContext();
  const { currentUserProfile } = useContext(AuthContext);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('pId', currentUserProfile.id);
    history.push({
      pathname,
      search: urlSearchParams.toString(),
    });
  }, [pathname, history, currentUserProfile]);

  useEffect(() => {
    let filters = {};
    const urlSearchParams = new URLSearchParams(search);
    if (urlSearchParams.has('tipoPrueba')) {
      filters = { ...filters, type: urlSearchParams.get('tipoPrueba') };
    }
    if (urlSearchParams.has('pId')) {
      filters = { ...filters, 'user.id': urlSearchParams.get('pId') };
    }
    getPatientHistory({ filters });
  }, [getPatientHistory, search]);

  const handleClose = () => {
    setModalVisible(false, null);
  };

  return (
    <>
      <ModalComponent visible={modalVisible} onBackdropClick={handleClose}>
        <DetailHistoryMedicalFormComponent />
      </ModalComponent>
      <Container maxWidth="md">
        <FiltersPatientHistoryComponent />
        <ListPatientHistoryComponent />
      </Container>
    </>
  );
}

export default withPatientHistoryContext(PatientHistoryComponent);
