import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IUser = typeof initialState;
type SetUserAction = PayloadAction<IUser>;

const initialState = {
  name: '',
  email: '',
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: SetUserAction) {
      return { ...state, ...action.payload };
    },
    reset() {
      return { ...initialState };
    },
  },
});

export default userSlice;
