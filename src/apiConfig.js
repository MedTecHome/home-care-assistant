import axios from 'axios';

export const apiIdentitytoolkit = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
});

export const apiSecureRefreshToken = axios.create({
  baseURL: 'https://securetoken.googleapis.com/v1/',
});
