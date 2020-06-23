import axios from 'axios';
import { BRANCH_DEPLOY } from './firebaseConfig';
import { reactDB, getPropValue, isLocal } from './helpers/utils';
import ErrorMessages from './MessageHandle/errorMessages';

const apiEmail = axios.create({
  baseURL: 'htt://api.'
});

const baseUrlFirebase =
  BRANCH_DEPLOY === 'develop'
    ? 'https://us-central1-test1-6f25a.cloudfunctions.net/api/'
    : 'https://us-central1-homecareview-blaze.cloudfunctions.net/api/';

const baseUrlLocal = reactDB === 'local' ? 'http://192.168.42.86:5001/test1-6f25a/us-central1/api/' : baseUrlFirebase;

const apiData = axios.create({
  baseURL: isLocal ? baseUrlLocal : baseUrlFirebase,
  timeout: 10000
});

apiData.interceptors.response.use(
  res => {
    if (BRANCH_DEPLOY === 'develop' || isLocal) {
      // eslint-disable-next-line no-console
      console.log(res);
    }
    // return new Promise(resolve => setTimeout(() => resolve(res), 10000));
    return res;
  },
  err => {
    if (!err.response)
      throw new Error(JSON.stringify({ code: 'error-connection', message: ErrorMessages.ERROR_CONECTION }));
    throw new Error(
      JSON.stringify({
        code:
          getPropValue(err, 'response.data.error.code') ||
          getPropValue(err, 'response.status').toString() ||
          'error-interno',
        message: getPropValue(err, 'response.data.error.code')
          ? ErrorMessages[getPropValue(err, 'response.data.error.code') || 'error-interno']
          : getPropValue(err, 'response.data.error.message')
      })
    );
  }
);

apiData.interceptors.request.use(
  config => {
    const newConfig = config;
    const token = localStorage.getItem('AuthToken');
    newConfig.headers.Authorization = token;
    newConfig.headers['Content-Type'] = 'application/json;charset=UTF-8';
    newConfig.headers.accept = 'application/json;charset=UTF-8';
    return newConfig;
  },
  error => {
    if (BRANCH_DEPLOY === 'develop' || isLocal) {
      // eslint-disable-next-line no-console
      console.log('request', error);
    }
    return new Error(error.message);
  }
);

export { apiEmail, apiData };
