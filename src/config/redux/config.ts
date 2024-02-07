import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { appLoadingReducer } from 'src/state/AppLoadingReducer/AppLoadingReducer';
import { favShowsReducer } from 'src/state/FavShowReducer/FavShowsReducer';
import { searchReducer } from 'src/state/SearchedShowsReducer/SearchedShowsReducer';
import { ShowInfoReducer } from 'src/state/ShowInfoReducer/ShowInfoReducer';
import { userReducer } from 'src/state/user/userReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  search: searchReducer,
  favShows: favShowsReducer,
  user: userReducer,
  appLoading: appLoadingReducer,
  show: ShowInfoReducer,
});

const reducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: reducers,
});

export const persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
