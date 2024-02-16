import DismissKeyboardView from '@app/_component/DismissKeyboardView';
import { API_URL } from '@src/const';
import userSlice from '@src/redux/slice/user';
import { useDispatch } from '@src/redux/store';
import { AppStackParamList } from '@src/type/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios, { AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function SignIn({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleEmail = (text: string) => setEmail(() => text);
  const handlePassword = (text: string) => setPassword(() => text);
  const dispatch = useDispatch();

  const validateInput = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail) {
      emailRef.current?.focus();
      throw new Error('이메일을 입력해주세요');
    }

    if (!trimmedPassword) {
      passwordRef.current?.focus();
      throw new Error('비밀번호를 입력해주세요');
    }
  };

  const handleSubmit = async () => {
    try {
      if (isLoading) return;
      setIsLoading(() => true);
      validateInput();

      const res: AxiosResponse<{
        data: {
          name: string;
          email: string;
          accessToken: string;
          refreshToken: string;
        };
      }> = await axios({
        method: 'POST',
        url: `${API_URL}/login`,
        data: {
          email: email.trim(),
          password: password.trim(),
        },
      });

      setIsLoading(() => false);

      dispatch(
        userSlice.actions.setUser({
          name: res.data.data.name,
          email: res.data.data.email,
          accessToken: res.data.data.accessToken,
          money: 0,
        }),
      );

      await EncryptedStorage.setItem(
        'refreshToken',
        res.data.data.refreshToken,
      );

      console.log('signInData', res.data);
      Alert.alert('알림', '로그인 되었습니다');
    } catch (error) {
      setIsLoading(() => false);
      console.error(error);

      if (axios.isAxiosError(error)) {
        Alert.alert('알림', error.response?.data.message || '통신에러');
        return;
      }

      const message = error instanceof Error ? error.message : 'unkown error';
      Alert.alert('알림', message);
    }
  };

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  const isDisabled = !email || !password || isLoading;

  return (
    <DismissKeyboardView>
      <View style={styles.inputBox}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          ref={emailRef}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          value={email}
          onChangeText={handleEmail}
          returnKeyType="next"
          blurOnSubmit={false} //키보드가 내려가지 않도록
          onSubmitEditing={() => passwordRef.current?.focus()}
          clearButtonMode="while-editing"
          importantForAutofill="yes" //삼성패스... 등등
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          ref={passwordRef}
          placeholder="비밀번호를 입력해주세요"
          placeholderTextColor="#666"
          value={password}
          onChangeText={handlePassword}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          clearButtonMode="while-editing"
          importantForAutofill="yes" //삼성패스... 등등
          autoComplete="password"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonBox}>
        <Pressable
          style={[
            styles.loginButton,
            isDisabled === false && styles.loginButtonActive,
          ]}
          onPress={handleSubmit}
          disabled={isDisabled}>
          {isLoading ? (
            <ActivityIndicator color="#FAFAFA" style={{ width: 16 * 3 }} />
          ) : (
            <Text style={styles.loginButtonText}>로그인</Text>
          )}
        </Pressable>
        <Pressable onPress={navigateSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonBox: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: { backgroundColor: 'blue' },
  loginButtonText: { color: 'white', fontSize: 16 },
});
