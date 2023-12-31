import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { DeliveryParamList } from '../../types/Navigation';
import Complete from '../../screens/Complete';
import Ing from '../../screens/Ing';

const Stack = createNativeStackNavigator<DeliveryParamList>();

function Delivery() {
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

export default Delivery;
