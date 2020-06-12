import axios from 'axios';
import { BRANCH_DEPLOY } from './firebaseConfig';

const apiEmail = axios.create({
  baseURL: 'htt://api.'
});

const apiData = axios.create({
  baseURL:
    BRANCH_DEPLOY === 'develop'
      ? 'https://us-central1-test1-6f25a.cloudfunctions.net/api'
      : 'https://us-central1-homecareview-blaze.cloudfunctions.net/api'
});

const apiDataLocal = axios.create({
  baseURL: 'http://localhost:5001/test1-6f25a/us-central1/api'
});

apiData.interceptors.request.use(config => {
  const newConfig = config;
  const token = localStorage.getItem('AuthToken');
  newConfig.headers.Authorization = token;
  return newConfig;
});

export { apiEmail, apiData, apiDataLocal };
