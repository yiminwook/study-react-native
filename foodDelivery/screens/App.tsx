import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTab from '../components/Navigations/AppTab';
import AppStack from '../components/Navigations/AppStack';
import { Provider } from 'react-redux';
import store from '../redux/store';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? <AppTab /> : <AppStack />}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
