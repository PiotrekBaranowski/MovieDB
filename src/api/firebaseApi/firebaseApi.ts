import { Query, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';

import { store } from 'src/config/redux/config';
import { favShowsDoneLoading, favShowsIsLoading } from 'src/state/AppLoadingReducer/AppLoadingReducer';
import {
  addUserNewFavShow,
  deleteUserFavShow,
  setFavShowsOfUserFromDB,
} from 'src/state/FavShowReducer/FavShowsReducer';
import { FavShow } from 'src/state/FavShowReducer/types';
import { TvShow } from 'src/state/SearchedShowsReducer/types';
import { uuid } from 'src/utils/ObjectUtils';

export const FAVSHOW_API_KEY = 'FAVSHOWS';

export const addFavShowToDB = async (db: Firestore, show: TvShow, uid: string): Promise<any> => {
  // to be changed <any>
  try {
    const newId = uuid();
    store.dispatch(favShowsIsLoading());
    const tvShowObj = {
      name: show.name,
      showId: show.showId,
      imageUrl: show.imageUrl ?? 'undefined',
      rating: show.rating ?? 0,
      platform: show.platform ?? 'undefined',
      userId: uid,
      id: newId,
    };
    await setDoc(doc(db, FAVSHOW_API_KEY, newId), tvShowObj);
    const isInDBCheck = await IsFavShowInDB(uid, newId, db);
    if (isInDBCheck !== undefined) {
      store.dispatch(addUserNewFavShow(tvShowObj));
    }
    store.dispatch(favShowsDoneLoading());
    return { success: 'Added show' };
  } catch (error: any) {
    store.dispatch(favShowsDoneLoading());
    return { failure: 'Error occured while adding show' };
  }
};

export const deleteFavShowFromDB = async (id: string, uid: string, db: Firestore): Promise<any> => {
  // to be changed <any>
  try {
    store.dispatch(favShowsIsLoading());
    await deleteDoc(doc(db, FAVSHOW_API_KEY, id));
    const isInDBCheck = await IsFavShowInDB(uid, uid, db);
    if (isInDBCheck === undefined) {
      store.dispatch(deleteUserFavShow({ id: id }));
    }
    store.dispatch(favShowsDoneLoading());
    return { success: 'Removed show' };
  } catch (err: any) {
    store.dispatch(favShowsDoneLoading());
    return { failure: 'Error occured while deleting show' };
  }
};

export const getFavShowsForUser = async (userId: string, db: Firestore): Promise<void> => {
  try {
    store.dispatch(favShowsIsLoading());
    const queryString = query<FavShow>(
      collection(db, FAVSHOW_API_KEY) as Query<FavShow>,
      where('userId', '==', userId)
    );
    const res = await getDocs(queryString);
    const data: FavShow[] = [];
    res.forEach((doc) => data.push(doc.data()));
    store.dispatch(setFavShowsOfUserFromDB(data));
    store.dispatch(favShowsDoneLoading());
  } catch (err: any) {
    alert(err.message);
  }
};

export const IsFavShowInDB = async (
  userId: string,
  id: string,
  db: Firestore
): Promise<FavShow | undefined | string> => {
  try {
    const queryString = query<FavShow>(
      collection(db, FAVSHOW_API_KEY) as Query<FavShow>,
      where('userId', '==', userId),
      where('id', '==', id)
    );
    const res = await getDocs(queryString);
    const data: FavShow[] = [];
    res.forEach((doc) => data.push(doc.data()));
    return data[0];
  } catch (err: any) {
    alert(err.message);
    return undefined;
  }
};
