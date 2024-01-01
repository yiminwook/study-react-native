import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
};

type SetUserAction = PayloadAction<{
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}>;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: SetUserAction) {
      return { ...action.payload, ...state };
    },
  },
});

export default userSlice;
