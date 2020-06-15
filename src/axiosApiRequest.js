import axios from 'axios';
import { BRANCH_DEPLOY } from './firebaseConfig';
import { reactDB } from './helpers/utils';

const apiEmail = axios.create({
  baseURL: 'htt://api.'
});

const apiData = axios.create({
  baseURL:
    BRANCH_DEPLOY === 'develop'
      ? 'https://us-central1-test1-6f25a.cloudfunctions.net/api/'
      : 'https://us-central1-homecareview-blaze.cloudfunctions.net/api/'
});

const apiDataLocal = axios.create({
  baseURL: 'http://192.168.42.217:5001/test1-6f25a/us-central1/api/'
});

const apiFetch = reactDB === 'local' ? apiDataLocal : apiData;

apiFetch.interceptors.request.use(config => {
  const newConfig = config;
  const token = localStorage.getItem('AuthToken');
  newConfig.headers.Authorization = token;
  return newConfig;
});

export { apiEmail, apiFetch };
