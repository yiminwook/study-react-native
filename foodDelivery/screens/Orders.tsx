import EachOrder from '@/components/EachOrder';
import { Order } from '@/redux/slice/order';
import { useSelector } from '@/redux/store';
import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Orders() {
  const orders = useSelector(state => state.order.orders);

  const renderItem = useCallback(
    ({ item }: { item: Order }) => <EachOrder key={item.orderId} item={item} />,
    [],
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.orderId}
      renderItem={renderItem}
    />
  );
}
