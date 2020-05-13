import axios from 'axios';

const apiData = axios.create({
  baseURL: 'https://us-central1-test1-6f25a.cloudfunctions.net/api'
});

export default apiData;
