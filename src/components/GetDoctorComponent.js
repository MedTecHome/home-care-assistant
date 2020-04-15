import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { DoctorContext } from '../contexts/doctor/DoctorContext';
import FirebaseConfig from '../firebase.config';

const defaultFirestore = FirebaseConfig.firestore();

function GetDoctorCompoent({ location }) {
  const urlSearchParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (urlSearchParams.has('doctorId')) {
    }
  }, [location, urlSearchParams]);
  return <></>;
}

export default withRouter(GetDoctorCompoent);
