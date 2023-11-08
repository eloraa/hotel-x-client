import axios from 'axios';
import { clearStorage, getStoredValue, saveToLocale } from '../utils/localstorage';
import moment from 'moment/moment';
import { useNormalReq } from './useNormalReq';
import { signOut } from 'firebase/auth';
import { auth } from '../providers/AuthProvider';

export const useSecureReq = () => {
  const instance = axios.create({ baseURL: import.meta.env.VITE_BACKENDSERVER, withCredentials: true });
  const instance2 = useNormalReq()
  const refresh = user => {
    return new Promise((resolve, reject) => {
      instance2
        .post('/auth/refresh-token', user)
        .then(res => {
          console.log(res);
          saveToLocale(res.data.expires, 'expires');
          resolve(res);
        })
        .catch(err => {
          clearStorage('expires')
          clearStorage('user')
          signOut(auth)
          reject(err);
        });
    });
  };
  instance.interceptors.request.use(
    config => {
      const controller = new AbortController();
      const expires = getStoredValue('expires');
      const user = getStoredValue('user');

      if (moment(expires).isBefore() || (user && user.length)) {
        refresh(user)
          .then(res => {
            return res;
          })
          .catch(err => {
            controller.abort();
            return new Error(err);
          });
      }
      return {
        ...config,
        signal: controller.signal,
      };
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance;
};
