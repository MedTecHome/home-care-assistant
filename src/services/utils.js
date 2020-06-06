import moment from 'moment';
import { apiDataLocal } from '../axiosApiRequest';
import { dbFirebase } from '../firebaseConfig';
import { mutateDoc, queryFromParams, isLocal } from '../helpers/utils';

const globalPath = 'home-care-assistant';

const retriveDataApi = async (path, limit = 10, offset = '', filters, field, sort) => {
  // eslint-disable-next-line no-console
  console.log(limit, offset, field, sort);
  const query = queryFromParams(filters);
  const response = await apiDataLocal.get(`/${path}${query && `?${query}`}`);
  return response.data;
};

const retriveDocApi = async path => {
  const response = await apiDataLocal.get(`/${path}`);
  return response.data;
};

const setFilters = (Reference, filters) => {
  let ref = Reference;
  Object.keys(filters).map(k => {
    switch (k) {
      case 'name': {
        ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
        break;
      }
      case 'fullname': {
        ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
        break;
      }
      case 'clinicalDate': {
        const customDate = parseInt(filters[k], 10);
        const tomorrow = moment.unix(customDate).add(1, 'days').unix();
        ref = ref.orderBy(k, 'desc').where(k, '>=', customDate).where(k, '<', tomorrow);
        break;
      }
      case 'rangeDate': {
        const start = filters[k][0];
        const end = filters[k][1];
        ref = ref.where('clinicalDate', '>=', start).where('clinicalDate', '<=', end);
        break;
      }
      case 'startDate': {
        const start = filters[k][0];
        const end = filters[k][1];
        ref = ref.where(k, '>=', start).where(k, '<=', end);
        break;
      }
      case 'endDate': {
        const start = filters[k][0];
        const end = filters[k][1];
        ref = ref.where(k, '>=', start).where(k, '<=', end);
        break;
      }
      default: {
        ref = ref.where(k, '==', filters[k]);
        break;
      }
    }
    return null;
  });
  return ref;
};

const retriveDataFirebase = async (path, limit = 10, offset = '', filters, field, sort) => {
  try {
    let dataRef = dbFirebase.collection(`${globalPath}/${path}`);
    if (field && sort) {
      dataRef = dataRef.orderBy(field, sort);
    }
    dataRef = setFilters(dataRef, filters);
    const total = (await dataRef.get()).size;
    if (offset.next) {
      dataRef = dataRef.startAfter(offset.next).limit(limit);
    } else if (offset.prev) {
      dataRef = dataRef.endBefore(offset.prev).limitToLast(limit);
    } else {
      dataRef = dataRef.limit(limit);
    }
    const data = (await dataRef.get()).docChanges().map(({ doc }) => mutateDoc(doc));
    return { total, data };
  } catch (e) {
    throw new Error(e);
  }
};

const retriveDocFirebase = async path => {
  try {
    const doc = await dbFirebase.doc(`${globalPath}/${path}`).get();
    if (!doc.data()) throw new Error('El Elemento no existe.');
    return mutateDoc(doc);
  } catch (e) {
    throw new Error(e);
  }
};

const retriveData = isLocal ? retriveDataApi : retriveDataFirebase;
const retriveDoc = isLocal ? retriveDocApi : retriveDocFirebase;

export { retriveData, retriveDoc };
