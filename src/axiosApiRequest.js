import axios from 'axios';

const apiEmail = axios.create({
  baseURL: 'htt://api.'
});

const apiData = axios.create({
  baseURL: 'https://us-central1-test1-6f25a.cloudfunctions.net/api'
});

apiData.interceptors.request.use(config => {
  const newConfig = config;
  const token = localStorage.getItem('AuthToken');
  newConfig.headers.Authorization = token;
  return newConfig;
});

export { apiEmail, apiData };
