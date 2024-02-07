import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Firestore, doc, setDoc } from 'firebase/firestore';

import { store } from 'src/config/redux/config';
import { userHasLoggedIn, userHasLoggedOut } from 'src/state/user/userReducer';
import { UserForm } from 'src/state/user/types';

const USERS_API_KEY = 'USERS';

export const logInWithEmailAndPassword = async (auth: Auth, user: UserForm) => {
  try {
    const res = await signInWithEmailAndPassword(auth, user.email, user.password);
    if (res.user) {
      store.dispatch(userHasLoggedIn({ email: res.user.email ?? '', uid: res.user.uid ?? '' }));
    }
  } catch (err: any) {
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (db: Firestore, auth: Auth, user: UserForm) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const newUser = res.user;
    await setDoc(doc(db, USERS_API_KEY, newUser.uid), {
      uid: newUser.uid,
      authProvider: 'local',
      email: user.email,
    });
    await logInWithEmailAndPassword(auth, { email: user.email, password: user.password });
  } catch (err: any) {
    alert(err.message);
  }
};

export const logOutFromApp = async (auth: Auth) => {
  try {
    await signOut(auth);
    store.dispatch(userHasLoggedOut());
  } catch (err: any) {
    alert(err.message);
  }
};
