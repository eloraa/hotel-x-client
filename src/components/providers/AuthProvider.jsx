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
import { useAuthReq } from '../hooks/useAuthReq';
import { Toast } from '../utils/Toast';
import { saveToLocale } from '../utils/localstorage';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authReq = useAuthReq();

  const saveToCloud = user => {
    authReq
      .post('/auth/add', { ...user, name:user.displayName })
      .then(res => {
        saveToLocale(res.data.expires, 'expires');
      })
      .catch(() => {
        Toast('Something went wrong');
      });
  };
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(res => {
        saveToCloud(res.user)
    });
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider()).then(res => {
      const { isNewUser } = getAdditionalUserInfo(res);
      if (isNewUser) {
        saveToCloud(res.user)
      }
      return res;
    });
  };

  const signOutUser = () => {
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
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, createUser, signIn, updateUser, verifyEmail, resetPassword, googleSignin, signOutUser, loading }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
