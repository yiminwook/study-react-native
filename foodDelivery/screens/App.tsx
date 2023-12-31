import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTab from '../components/Navigations/AppTab';
import AppStack from '../components/Navigations/AppStack';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppTab /> : <AppStack />}
    </NavigationContainer>
  );
}

export default App;
