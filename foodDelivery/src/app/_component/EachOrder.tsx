import React, { useState } from 'react';
import orderSlice, { Order } from '@/redux/slice/order';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from '@/redux/store';
import axios from 'axios';
import { API_URL } from '@/const';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppTabParamList } from '@/type/Navigation';

interface EachOrderProps {
  item: Order;
}

export default function EachOrder({ item }: EachOrderProps) {
  const [detail, setDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<AppTabParamList>>();
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken);
  const toggleDetail = () => setDetail(prev => !prev);

  const onReject = () => dispatch(orderSlice.actions.rejectOrder(item.orderId));

  const onAccept = async () => {
    try {
      setIsLoading(() => true);

      await axios({
        method: 'POST',
        url: `${API_URL}/accept`,
        data: {
          orderId: item.orderId,
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(orderSlice.actions.acceptOrder(item.orderId));
      navigation.navigate('Delivery');
    } catch (error) {
      setIsLoading(() => false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          // 400 에러는 이미 다른 사람이 수락했을 때
          Alert.alert('알림', error.response.data.message);
          onReject();
        }
      }
    }
  };

  return (
    <View key={item.orderId} style={styles.orderContainer}>
      <Pressable
        onPress={toggleDetail}
        style={styles.info}
        disabled={isLoading}>
        <Text style={styles.eachInfo}>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
        </Text>
        <Text>삼성동</Text>
        <Text>서초동</Text>
      </Pressable>
      {detail && (
        <View>
          <View>
            <Text>네이버맵이 들어갈 장소</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable onPress={onAccept} style={styles.acceptButton}>
              <Text style={styles.buttonText}>수락</Text>
            </Pressable>
            <Pressable onPress={onReject} style={styles.rejectButton}>
              <Text style={styles.buttonText}>거절</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eachInfo: {
    // flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },
  rejectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
