import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from '../../types/Navigation';
import Orders from '../../screens/Orders';
import Delivery from '../../screens/Delivery';
import Settings from '../../screens/Settings';

const Tab = createBottomTabNavigator<AppTabParamList>();

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName="Orders">
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{ title: '오더 목록', unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Delivery"
        component={Delivery}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: '내 정보', unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
}

export default HomeTab;
