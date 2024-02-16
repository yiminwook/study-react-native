import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from '@/type/Navigation';
import Orders from '@app/orders/page';
import Page from '@app/delivery/page';
import Settings from '@app/settings/page';

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
        component={Page}
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
