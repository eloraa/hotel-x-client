import axios from 'axios';

export const useAuthReq = () => {
  const instance = axios.create({ baseURL: import.meta.env.VITE_BACKENDSERVER, withCredentials: true });
  return instance;
};
