import { createSlice } from '@reduxjs/toolkit';

import { AppLoadingState } from 'src/state/AppLoadingReducer/types';

const initialState: AppLoadingState = {
  searchedShowsisLoading: false,
  favShowsisLoading: true,
  showInfoisLoading: false,
};

export const AppLoadingSlice = createSlice({
  name: 'AppLoading',
  initialState,
  reducers: {
    searchedShowsisLoading: (state) => {
      return { ...state, searchedShowsisLoading: true };
    },
    searchedShowsDoneLoading: (state) => {
      return { ...state, searchedShowsisLoading: false };
    },
    favShowsIsLoading: (state) => {
      return { ...state, favShowsisLoading: true };
    },
    favShowsDoneLoading: (state) => {
      return { ...state, favShowsisLoading: false };
    },
    showInfoIsLoading: (state) => {
      return { ...state, showInfoisLoading: true };
    },
    showInfoDoneLoading: (state) => {
      return { ...state, showInfoisLoading: false };
    },
  },
});

//

export const {
  searchedShowsisLoading,
  searchedShowsDoneLoading,
  favShowsIsLoading,
  favShowsDoneLoading,
  showInfoIsLoading,
  showInfoDoneLoading,
} = AppLoadingSlice.actions;
export const appLoadingReducer = AppLoadingSlice.reducer;
