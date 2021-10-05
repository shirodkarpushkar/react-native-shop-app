import React from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/cartItem';
const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => state.cart.items);
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Number(cartTotalAmount).toFixed(2)}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={!cartItems.length}
        />
      </View>
      <FlatList
        data={cartItems}
        renderItem={({item}) => (
          <CartItem
            quantity={item.quantity}
            title={item.title}
            amount={item.sum}
            onRemove={() => {}}
          />
        )}
      />
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
    fontWeight: '600',
  },
  amount: {
    color: Colors.primary,
  },
});
export default CartScreen;
