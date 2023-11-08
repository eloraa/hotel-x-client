import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { app } from '../utils/firebase.config';
import { useSecureReq } from '../hooks/useSecureReq';
import { Toast } from '../utils/Toast';
import { clearStorage, saveToLocale } from '../utils/localstorage';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const secureReq = useSecureReq();

  const saveToCloud = user => {
    secureReq
      .post('/auth/add-user', user)
      .then(res => {
        saveToLocale(res.data.expires, 'expires');
      })
      .catch(err => {
        console.log(err);
        Toast('Something went wrong');
      });
  };

  const getToken = user => {
    secureReq
      .post('/auth/get-token', user)
      .then(res => {
        saveToLocale(res.data.expires, 'expires');
      })
      .catch(err => {
        console.log(err);
        Toast('Something went wrong');
      });
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(res => {
      saveToCloud(res.user);
      return res;
    });
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then(res => {
      getToken(res.user);
      return res;
    });
  };
  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider()).then(res => {
      const { isNewUser } = getAdditionalUserInfo(res);
      if (isNewUser) {
        saveToCloud(res.user);
      } else {
        getToken(res.user);
      }
      return res;
    });
  };

  const signOutUser = () => {
    clearStorage('expires');
    clearStorage('user');
    setLoading(true);
    return signOut(auth);
  };

  const updateUser = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const verifyEmail = () => sendEmailVerification(auth.currentUser);
  const resetPassword = email => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      if(currentUser) saveToLocale({ email: currentUser.email, uid: currentUser.uid }, 'user')
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, createUser, signIn, updateUser, verifyEmail, resetPassword, googleSignin, signOutUser, saveToCloud, getToken, loading }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
