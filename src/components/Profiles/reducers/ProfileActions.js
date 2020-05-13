import moment from 'moment';
import apiData from '../../../axiosApiRequest';
import { authFirebase, dbRef } from '../../../firebaseConfig';
import { ADD_FORM_TEXT, EDIT_FORM_TEXT, DELETE_FORM_TEXT } from '../../../commons/globalText';
import { getRoleByIdAction } from '../../fields/roles/reducers/RoleActions';
import { getHospitalByIdAction } from '../../Hospital/reducers/HospitalActions';
import { getNomById } from '../../../nomenc/NomencAction';
import { isEmpty } from '../../../helpers/utils';

const actionCodeSettings = {
  url: 'http://localhost:3000/inicio',
  handleCodeInApp: true
};

const profilesRef = dbRef('profile').collection('profiles');

export const getProfileByIdAction = async (id, fields = []) => {
  const ref = await profilesRef.doc(id).get();
  const data = fields.map(k => ({ [k]: ref.data()[k] })).reduce((a, b) => ({ ...a, ...b }), {});
  return { id: ref.id, ...(isEmpty(fields) ? ref.data() : data) };
};

export const getProfilesAction = async ({ limit = 10, next, prev, filters }) => {
  let ref = profilesRef.orderBy('fullname');
  if (next) {
    ref = ref.startAfter(next.fullname);
  } else if (prev) {
    ref = ref.endBefore(prev.fullname);
  }
  if (filters) {
    Object.keys(filters).map(k => {
      if (k === 'fullname') {
        ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
      } else {
        ref = ref.where(k, '==', filters[k]);
      }
      return null;
    });
  }
  if (prev) ref = ref.limitToLast(limit);
  else ref = ref.limit(limit);
  return (await ref.get()).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const mutateValues = async ({ birthday, doctor, role, hospital, sex }) => ({
  ...(birthday ? { birthday: moment(birthday).toDate() } : {}),
  ...(doctor ? { doctor: await getProfileByIdAction(doctor, ['fullname']) } : {}),
  ...(role ? { role: await getRoleByIdAction(role) } : {}),
  ...(hospital ? { hospital: await getHospitalByIdAction(hospital, ['name']) } : {}),
  ...(sex ? { sex: await getNomById('sex')(sex) } : {})
});

const addValuesAction = async ({ id, user, ...values }) => {
  const mutations = await mutateValues(values);
  const result = { ...values, ...mutations };
  const response = await apiData.post('/createUser', { email: user, fullname: `${values.name} ${values.lastName}` });
  const u = response.data;
  await authFirebase.sendPasswordResetEmail(u.user.email, actionCodeSettings);
  await profilesRef.add({
    ...result,
    user: { id: u.user.uid, email: u.user.email },
    createdAt: Date.now()
  });
};

const editValuesAction = async ({ id, user, ...values }) => {
  const result = { ...values, ...(await mutateValues(values)) };
  await profilesRef.doc(id).update({
    ...result,
    updatedAt: Date.now()
  });
};

const deleteValuesAction = async ({ id, user }) => {
  await apiData.post('/deleteUser', { userId: user.id });
  await profilesRef.doc(id).delete();
};

export const saveProfileValuesAction = async (values, formType) => {
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
