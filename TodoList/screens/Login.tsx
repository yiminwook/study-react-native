import React, { useState } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ScreenProps } from '../types/Navigation';
import ListIcon from '../assets/listIcon.svg';

const Login = ({ route, navigation }: ScreenProps<'Login'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleText = (type: 'email' | 'password', text: string) => {
    if (type === 'email') {
      setEmail(() => text);
    }

    if (type === 'password') {
      setPassword(() => text);
    }
  };

  const handleSubmit = () => {
    console.log('Submit');
  };

  return (
    <View style={styles.container}>
      <ListIcon />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="이메일"
          style={styles.input}
          value={email}
          onChangeText={text => handleText('email', text)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="비밀번호"
          style={styles.input}
          value={password}
          onChangeText={text => handleText('password', text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => {}}>
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 15,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    fontSize: 15,
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'black',
  },
});
