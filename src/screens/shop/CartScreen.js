import React from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
const CartScreen = props => {
    const cartTotalAmount = useSelector(state =>state.cart.totalAmount)
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Number(cartTotalAmount).toFixed(2)}
          </Text>
        </Text>
        <Button title="Order Now" />
      </View>
      <View>
        <Text>Cart Items</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
    summaryText: {
      fontWeight:"600"
  },
    amount: {
      color:Colors.primary
  },
});
export default CartScreen;