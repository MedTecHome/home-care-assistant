import moment from 'moment';
import { apiFetch } from '../../../axiosApiRequest';
import { dbFirebase } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT, USERNAME_DOMAIN } from '../../../commons/globalText';

const profilesRef = dbFirebase.collection('profiles');

const mutateValues = async ({
  name = '',
  lastName = '',
  birthday,
  parent,
  maxDoctors,
  maxPatients,
  role,
  sex,
  secondaryPhone = ''
}) => ({
  name: name.toLowerCase(),
  lastName: lastName.toLowerCase(),
  secondaryPhone,
  ...(maxDoctors ? { maxDoctors: parseInt(maxDoctors, 10) } : {}),
  ...(maxPatients ? { maxPatients: parseInt(maxPatients, 10) } : {}),
  ...(birthday ? { birthday: moment(birthday).toDate() } : {}),
  ...(birthday ? { birthday: moment(birthday).toDate() } : {}),
  parent: parent || null,
  role,
  ...(sex ? { sex } : {})
});

const addValuesAction = async ({ id, email, password, username, ...values }) => {
  const mutations = await mutateValues(values);
  const result = { ...values, ...mutations, ...(mutations.role === 'clinic' ? { realDoctors: 0 } : {}) };
  const response = await apiFetch.post('/createUser', {
    username: `${username}${USERNAME_DOMAIN}`,
    password,
    fullname: `${values.name} ${values.lastName}`
  });
  const { user } = response.data;
  await profilesRef.doc(user.uid).set({
    ...result,
    email,
    username,
    user,
    createdAt: Date.now()
  });
};

const editValuesAction = async ({ id, ...values }) => {
  const result = { ...values, ...(await mutateValues(values)) };
  await profilesRef.doc(id).update({
    ...result,
    updatedAt: Date.now()
  });
};

const deleteValuesAction = async ({ id }) => {
  await profilesRef.doc(id).delete();
  await apiFetch.post('/deleteUser', { userId: id });
};

const saveProfileValuesAction = async (values, formType) => {
  if (formType === ADD_FORM_TEXT) {
    await addValuesAction(values);
  }
  if (formType === EDIT_FORM_TEXT) {
    await editValuesAction(values);
  }
  if (formType === DELETE_FORM_TEXT) {
    await deleteValuesAction(values);
  }
  return Promise;
};

export default saveProfileValuesAction;
