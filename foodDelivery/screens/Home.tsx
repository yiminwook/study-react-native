import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from '../components/Navigations/HomeTab';
import HomeStack from '../components/Navigations/HomeStack';
import { useSelector } from '../redux/store';
import useSocket from '../hooks/useSocket';

function Home() {
  const isLoggedIn = useSelector(state => !!state.user.email);
  const [socket, disconnect] = useSocket();

  useEffect(() => {
    const listener = (data: any) => {
      console.log(data);
      // console.log('error', data?.io?.$error?.[0]);
    };

    if (socket && isLoggedIn) {
      socket.on('hello', listener);
    }

    return () => {
      if (socket) {
        socket.off('hello', listener);
      }
    };
  }, [socket, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      disconnect();
    }
  }, [isLoggedIn, disconnect]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeTab /> : <HomeStack />}
    </NavigationContainer>
  );
}

export default Home;
