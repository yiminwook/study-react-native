import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
};

type SetUserAction = PayloadAction<{
  name: string;
  email: string;
  accessToken: string;
}>;

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
