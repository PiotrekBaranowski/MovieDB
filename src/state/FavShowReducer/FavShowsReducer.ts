import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FavShow, FavShowState } from 'src/state/FavShowReducer/types';

const initialState: FavShowState = {
  favShowList: [],
};

export const favShowsSlice = createSlice({
  name: 'favShows',
  initialState,
  reducers: {
    setFavShowsOfUserFromDB: (state, action: PayloadAction<FavShow[]>) => {
      return { favShowList: action.payload };
    },
    addUserNewFavShow: (state, action: PayloadAction<FavShow>) => {
      return { favShowList: [...state.favShowList, action.payload] };
    },
    deleteUserFavShow: (state, action: PayloadAction<{ id: string }>) => {
      return {
        favShowList: state.favShowList.filter((show) => show.id !== action.payload.id),
      };
    },
    setFavShowsInitialState: () => {
      return initialState;
    },
  },
});

//

export const { setFavShowsInitialState, setFavShowsOfUserFromDB, addUserNewFavShow, deleteUserFavShow } =
  favShowsSlice.actions;
export const favShowsReducer = favShowsSlice.reducer;
