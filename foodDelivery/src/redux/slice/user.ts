import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IUser = typeof initialState;
type SetUserAction = PayloadAction<IUser>;

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  money: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: SetUserAction) {
      return { ...state, ...action.payload };
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setMoney(state, action: PayloadAction<number>) {
      state.money = action.payload;
    },
    reset() {
      return { ...initialState };
    },
  },
});

export default userSlice;
