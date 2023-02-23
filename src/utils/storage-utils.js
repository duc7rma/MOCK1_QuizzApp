import { EAuthToken } from 'variables';

export const removeItem = (key) => {
  return localStorage.removeItem(key);
};

export const handleStorageToken = (token) => {
  localStorage.setItem(EAuthToken.ACCESS_TOKEN, token?.access_token.access_token);
  localStorage.setItem(EAuthToken.REFRESH_TOKEN, token?.refresh_token.refresh_token);
};

export const handleGetStorageToken = (token) => {
  return localStorage.getItem(EAuthToken.ACCESS_TOKEN);
};
