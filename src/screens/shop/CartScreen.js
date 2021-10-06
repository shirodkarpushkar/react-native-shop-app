import React from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/cartItem';
import {useDispatch} from 'react-redux';
import { removeFromCart } from '../../store/actions/cart';
import _ from 'lodash'
import { addOrder } from '../../store/actions/orders';
const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const stateItems =  useSelector(state => state.cart.items)
  const cartItems = _.sortBy(stateItems,"title","asc");
  const dispatch = useDispatch();
  const removeCartItem = item => {
    dispatch(removeFromCart(item));
  };
  const orderItems = () => {
    dispatch(addOrder(cartItems, cartTotalAmount));
  }
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Number(cartTotalAmount <= 0 ? 0 : cartTotalAmount).toFixed(2)}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          onPress={()=>orderItems()}
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
            onRemove={() => removeCartItem(item)}
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
