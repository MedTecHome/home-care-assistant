import axios from 'axios';

const apiEmail = axios.create({
  baseURL: ''
});

const apiData = axios.create({
  baseURL: 'https://us-central1-test1-6f25a.cloudfunctions.net/api'
});

apiData.interceptors.request.use(config => {
  const token = localStorage.getItem('AuthToken');
  console.log('token', token);
  config.headers.Authorization = token;

  return config;
});

export { apiEmail, apiData };
