// EXPERIMENTAL: JUST TO MAKE ME ADMIN OF THE SITE

import { Toast } from './Toast';
import admin from 'firebase-admin';
import { app } from './firebase.config';
admin.initializeApp(app);

// Function to make a user an admin
export const makeUserAdmin = userId => {
  const adminClaim = { isAdmin: true };
  return admin.auth
    .setCustomUserClaims(userId, adminClaim)
    .then(() => {
      Toast('User is now an admin.');
    })
    .catch(error => {
      console.error('Error making user an admin:', error);
    });
};
