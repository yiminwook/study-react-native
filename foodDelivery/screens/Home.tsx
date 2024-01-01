import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from '../components/Navigations/HomeTab';
import HomeStack from '../components/Navigations/HomeStack';
import { useSelector } from '../redux/store';

function Home() {
  const isLoggedIn = useSelector(state => !!state.user.email);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeTab /> : <HomeStack />}
    </NavigationContainer>
  );
}

export default Home;
