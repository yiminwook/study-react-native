import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AppStackParamList } from '../types/Navigation';

function SignIn({
  navigation,
}: NativeStackScreenProps<AppStackParamList, 'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleEmail = (text: string) => setEmail(() => text);
  const handlePassword = (text: string) => setPassword(() => text);

  const handleSubmit = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail) {
      Alert.alert('알림', '이메일을 입력해주세요');
      emailRef.current?.focus();
      return;
    }

    if (!trimmedPassword) {
      Alert.alert('알림', '비밀번호를 입력해주세요');
      passwordRef.current?.focus();
      return;
    }

    Alert.alert('알림', '로그인 되었습니다');
  };

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  const isDisabled = !email || !password;

  return (
    <View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          ref={emailRef}
          value={email}
          onChangeText={handleEmail}
          placeholder="이메일을 입력해주세요"
          importantForAutofill="yes" //삼성패스... 등등
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false} //키보드가 내려가지 않도록
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          ref={passwordRef}
          value={password}
          onChangeText={handlePassword}
          placeholder="비밀번호를 입력해주세요"
          importantForAutofill="yes" //삼성패스... 등등
          autoComplete="password"
          textContentType="password"
          secureTextEntry={true}
          returnKeyType="done"
          clearButtonMode="while-editing"
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
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={navigateSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </View>
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
