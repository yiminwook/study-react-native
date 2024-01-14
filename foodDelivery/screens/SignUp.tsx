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
import { checkEmail, checkPassword } from '../utils/regexp';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios from 'axios';
import { API_URL } from '../consts';

function SignUp({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'SignUp'>) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleEmail = (text: string) => setEmail(() => text);
  const handleName = (text: string) => setName(() => text);
  const handlePassword = (text: string) => setPassword(() => text);

  const validateInput = () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      emailRef.current?.focus();
      throw new Error('이메일을 입력해주세요');
    }
    if (checkEmail(trimmedEmail) === false) {
      emailRef.current?.focus();
      throw new Error('이메일 형식을 확인해주세요');
    }
    if (!trimmedName) {
      nameRef.current?.focus();
      throw new Error('이름을 입력해주세요');
    }
    if (!trimmedPassword) {
      passwordRef.current?.focus();
      throw new Error('비밀번호를 입력해주세요');
    }
    if (checkPassword(trimmedPassword) === false) {
      passwordRef.current?.focus();
      throw new Error(
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
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
        method: 'post',
        url: `${API_URL}/user`,
        data: {
          email: email.trim(),
          name: name.trim(),
          password: password.trim(),
        },
      });

      const data = res.data;
      setIsLoading(() => false);
      console.log('signUpData', data);
      Alert.alert('알림', '회원가입 되었습니다');
      navigation.navigate('SignIn');
    } catch (error) {
      setIsLoading(() => false);
      console.error(error);

      if (axios.isAxiosError(error)) {
        Alert.alert('알림', error.response?.data.message || '통신에러');
        return;
      }

      const message = error instanceof Error ? error.message : 'unknow error';
      Alert.alert('알림', message);
    }
  };

  const isDisabled = !email || !name || !password || isLoading;

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
          clearButtonMode="while-editing"
          onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false} //키보드가 내려가지 않도록
          importantForAutofill="yes" //삼성패스... 등등
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.textInput}
          ref={nameRef}
          placeholder="이름을 입력해주세요"
          placeholderTextColor="#666"
          value={name}
          onChangeText={handleName}
          returnKeyType="next"
          clearButtonMode="while-editing"
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false} //키보드가 내려가지 않도록
          importantForAutofill="yes" //삼성패스... 등등
          autoComplete="name"
          textContentType="name"
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
      <View style={styles.bottonBox}>
        <Pressable
          style={[
            styles.signUpButton,
            isDisabled === false && styles.signUpButtonActive,
          ]}
          onPress={handleSubmit}
          disabled={isDisabled}>
          {isLoading ? (
            <ActivityIndicator color="#FAFAFA" style={{ width: 16 * 4 }} />
          ) : (
            <Text style={styles.signUpButtonText}>회원가입</Text>
          )}
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
  bottonBox: {
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  signUpButtonActive: {
    backgroundColor: 'blue',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignUp;
