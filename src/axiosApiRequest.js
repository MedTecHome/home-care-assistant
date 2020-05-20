import axios from 'axios';

export const apiEmail = axios.create({
  baseURL: ''
});

export const apiData = axios.create({
  baseURL: 'https://us-central1-test1-6f25a.cloudfunctions.net/api'
});
