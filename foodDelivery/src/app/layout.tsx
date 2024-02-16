import React from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Home from './page';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
