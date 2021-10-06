import React from 'react';
import {FlatList, View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={({item}) => (
        <View>
          <Text>{item.amount}</Text>
        </View>
      )}
    />
  );
};
export default OrdersScreen;
