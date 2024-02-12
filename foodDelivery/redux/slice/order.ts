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
    acceptOrder: (state, action: PayloadAction<string>) => {
      const index = state.orders.findIndex(
        order => order.orderId === action.payload,
      );
      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1);
      }
    },
    rejectOrder: (state, action: PayloadAction<string>) => {
      const orderIndex = state.orders.findIndex(
        order => order.orderId === action.payload,
      );
      if (orderIndex > -1) {
        state.orders.splice(orderIndex, 1);
      }

      const deliveryIndex = state.deliveries.findIndex(
        order => order.orderId === action.payload,
      );
      if (deliveryIndex > -1) {
        state.deliveries.splice(deliveryIndex, 1);
      }
    },
  },
  extraReducers: builder => {},
});

export default orderSlice;
