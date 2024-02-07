import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ShowInfoState } from 'src/state/ShowInfoReducer/types';

const initialState: ShowInfoState = {
  cast: [],
  episode: [],
  season: [],
  show: { name: '' },
};

export const ShowInfoSlice = createSlice({
  name: 'ShowInfo',
  initialState,
  reducers: {
    setShowInfo: (state, action: PayloadAction<ShowInfoState>) => {
      return {
        cast: action.payload.cast,
        episode: action.payload.episode,
        season: action.payload.season,
        show: action.payload.show,
      };
    },
    initialStateShowInfo: () => {
      return initialState;
    },
  },
});

//

export const { setShowInfo, initialStateShowInfo } = ShowInfoSlice.actions;
export const ShowInfoReducer = ShowInfoSlice.reducer;
