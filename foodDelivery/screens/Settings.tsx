import axios from 'axios';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { API_URL } from '../consts';
import userSlice from '../redux/slice/user';
import { useDispatch, useSelector } from '../redux/store';

function Settings() {
  const accessToken = useSelector(state => state.user.accessToken);
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

  return (
    <View style={styles.buttonBox}>
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

export default Settings;

const styles = StyleSheet.create({
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
