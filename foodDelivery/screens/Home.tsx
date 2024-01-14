import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import HomeStack from '../components/Navigations/HomeStack';
import HomeTab from '../components/Navigations/HomeTab';
import { API_URL } from '../consts';
import useSocket from '../hooks/useSocket';
import userSlice, { IUser } from '../redux/slice/user';
import { useDispatch, useSelector } from '../redux/store';
import SplashScreen from 'react-native-splash-screen';

function Home() {
  const isLoggedIn = useSelector(state => !!state.user.email);
  const dispatch = useDispatch();
  const [socket, disconnect] = useSocket();

  const getTokenAndRefresh = async () => {
    try {
      const refreshToken = await EncryptedStorage.getItem('refreshToken');

      if (!refreshToken) {
        SplashScreen.hide();
        return;
      }

      const response = await axios({
        method: 'POST',
        url: `${API_URL}/refreshToken`,
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
        data: {},
      });

      const data: IUser = response.data.data;
      dispatch(userSlice.actions.setUser({ ...data }));
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data.code === 'expired') {
          EncryptedStorage.removeItem('refreshToken');
          Alert.alert('알림', '로그인이 만료되었습니다. 다시 로그인해주세요.');
        }
      }
    } finally {
      // 스플레시 스크린을 지운다.
      SplashScreen.hide();
    }
  };

  useEffect(() => {
    getTokenAndRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listener = (data: any) => {
      console.log('order >> ', data);
      const error = data?.io?.$error?.[0];
      if (error) console.error(error);
    };

    if (socket && isLoggedIn) {
      socket.emit('acceptOrder', 'hello');
      // emit 이후 주문을 받는다.
      socket.on('order', listener);
    }

    return () => {
      if (socket) {
        socket.off('order', listener);
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
