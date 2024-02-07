import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SearchedShows } from 'src/state/SearchedShowsReducer/types';

const initialState: SearchedShows = {
  searchText: '',
  searchedShowsList: [],
};

export const searchedShowsSlice = createSlice({
  name: 'searchedShows',
  initialState,
  reducers: {
    updateSearchedShowList: (state, action: PayloadAction<SearchedShows>) => {
      return { searchText: action.payload.searchText, searchedShowsList: action.payload.searchedShowsList };
    },
    initialStateSearchedShowList: () => {
      return initialState;
    },
  },
});

//

export const { updateSearchedShowList, initialStateSearchedShowList } = searchedShowsSlice.actions;
export const searchReducer = searchedShowsSlice.reducer;
