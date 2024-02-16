import axios, { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { API_URL } from '@src/const';
import userSlice from '@src/redux/slice/user';
import { useDispatch, useSelector } from '@src/redux/store';

export default function Settings() {
  const accessToken = useSelector(state => state.user.accessToken);
  const money = useSelector(state => state.user.money);
  const name = useSelector(state => state.user.name);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await axios({
        url: `${API_URL}/logout`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        data: {},
      });
      const data = response.data;
      console.log('logout', data);
      await EncryptedStorage.removeItem('refreshToken');
      dispatch(userSlice.actions.reset());
      Alert.alert('알림', '로그아웃 되었습니다.');
    } catch (error) {
      console.error(error);
      Alert.alert('에러', '로그아웃에 실패했습니다.');
    }
  };

  useEffect(() => {
    const getMony = async () => {
      try {
        const response: AxiosResponse<{ data: number }> = await axios({
          method: 'GET',
          url: `${API_URL}/showmethemoney`,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

        dispatch(userSlice.actions.setMoney(response.data.data));
      } catch (error) {
        console.error(error);
      }
    };

    getMony();
  }, [accessToken, dispatch]);

  return (
    <View style={styles.buttonBox}>
      <View style={styles.money}>
        <Text style={styles.moneyText}>
          {name}님의 수익금{' '}
          <Text style={{ fontWeight: 'bold' }}>
            {money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          원
        </Text>
      </View>
      <Pressable
        //배열로도 가능
        style={StyleSheet.compose(
          styles.logoutButton,
          styles.logoutButtonActive,
        )}
        onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  money: {
    padding: 20,
  },
  moneyText: {
    fontSize: 16,
  },
  buttonBox: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logoutButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButtonActive: {
    backgroundColor: 'blue',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
