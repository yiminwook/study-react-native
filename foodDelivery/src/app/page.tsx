import { API_URL } from '@/const';
import useSocket from '@/hook/useSocket';
import orderSlice, { Order } from '@/redux/slice/order';
import userSlice, { IUser } from '@/redux/slice/user';
import { useDispatch, useSelector } from '@/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
import HomeStack from './_component/HomeStack';
import HomeTab from './_component/HomeTab';

export default function Home() {
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
      console.log(error);
      if (axios.isAxiosError(error)) {
        EncryptedStorage.removeItem('refreshToken');
        if (error.response?.data.code === 'expired') {
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
    const listener = (data: Order) => {
      dispatch(orderSlice.actions.addOrder(data));
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
  }, [socket, isLoggedIn, dispatch]);

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
