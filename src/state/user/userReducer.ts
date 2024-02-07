import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User, UserState } from 'src/state/user/types';

const initialState: UserState = {
  email: '',
  uid: '',
  isLogged: false,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    userHasLoggedIn: (state, action: PayloadAction<User>) => {
      return (state = {
        email: action.payload.email,
        uid: action.payload.uid,
        isLogged: true,
      });
    },
    userHasLoggedOut: () => {
      return initialState;
    },
  },
});

//

export const { userHasLoggedIn, userHasLoggedOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
