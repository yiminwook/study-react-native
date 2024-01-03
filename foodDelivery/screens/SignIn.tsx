import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { AppStackParamList } from '../types/Navigation';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios from 'axios';
import Config from 'react-native-config';

function SignIn({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleEmail = (text: string) => setEmail(() => text);
  const handlePassword = (text: string) => setPassword(() => text);

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
      if (isLoading) {
        return;
      }
      setIsLoading(() => true);
      validateInput();

      const res = await axios({
        method: 'get',
        url: `${Config.API_URL}`,
        // data: {
        //   email: email.trim(),
        //   password: password.trim(),
        // },
      });

      const data = res.data;
      console.log('signInData', data);
      Alert.alert('알림', '로그인 되었습니다');
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        Alert.alert('알림', error.response?.data.message || '통신에러');
      }

      const message = error instanceof Error ? error.message : 'unkown error';
      Alert.alert('알림', message);
    } finally {
      setIsLoading(() => false);
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

export default SignIn;
