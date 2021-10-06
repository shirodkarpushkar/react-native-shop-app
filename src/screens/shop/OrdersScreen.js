import React, {useEffect} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import OrderItem from '../../components/shop/orderItem';
import HeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="drawer"
            iconName="ios-menu"
            onPress={() => props.navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  });
  if (!orders.length) {
    return (
      <View style={styles.screen}>
        <Text>You have no orders. Please Order Something..</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={({item}) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.readableDate}
          items={item.items}
         
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OrdersScreen;
