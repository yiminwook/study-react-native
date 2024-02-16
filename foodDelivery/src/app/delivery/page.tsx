import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { DeliveryParamList } from '@src/type/Navigation';
import Complete from './_component/Complete';
import Ing from './_component/Ing';

const Stack = createNativeStackNavigator<DeliveryParamList>();

export default function Delivery() {
  return (
    <Stack.Navigator initialRouteName="Ing">
      <Stack.Screen
        name="Ing"
        component={Ing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
