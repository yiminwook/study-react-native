import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Order {
  orderId: string;
  price: number;
  end: {
    latitude: number;
    longitude: number;
  };
  start: {
    latitude: number;
    longitude: number;
  };
}

interface IOrderState {
  orders: Order[];
  deliveries: Order[];
}

const initialState: IOrderState = {
  orders: [],
  deliveries: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    acceptOrder: (state, action) => {},
    rejectOrder: (state, action) => {},
  },
  extraReducers: builder => {},
});

export default orderSlice;
