import moment from 'moment';
import { dbFirebase } from '../firebaseConfig';
import { mutateDoc } from '../helpers/utils';

const globalPath = 'home-care-assistant';

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

const retriveData = async (path, limit = 10, offset = '', filters, field, sort) => {
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

const retriveDoc = async path => {
  try {
    const doc = await dbFirebase.doc(`${globalPath}/${path}`).get();
    if (!doc.data()) throw new Error('El Elemento no existe.');
    return mutateDoc(doc);
  } catch (e) {
    throw new Error(e);
  }
};

export { retriveData, retriveDoc };
