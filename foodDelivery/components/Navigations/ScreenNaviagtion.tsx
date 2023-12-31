import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/Navigation';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';

const Stack = createNativeStackNavigator<RootStackParamList>();

function ScreenNaviagtion() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: '로그인' }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: '회원가입' }}
      />
    </Stack.Navigator>
  );
}

export default ScreenNaviagtion;
