import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from '../components/Navigations/TabNavigation';
import ScreenNaviagtion from '../components/Navigations/ScreenNaviagtion';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <>{isLoggedIn ? <TabNavigation /> : <ScreenNaviagtion />}</>
    </NavigationContainer>
  );
}

export default App;
