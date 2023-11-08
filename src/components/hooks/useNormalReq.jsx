import axios from 'axios';

export const useNormalReq = () => {
  const instance = axios.create({ baseURL: import.meta.env.VITE_BACKENDSERVER });
  return instance;
};
