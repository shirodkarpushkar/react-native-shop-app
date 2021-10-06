import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from './cartItem';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>
          ${Number(props.amount).toFixed(2)}
        </Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>

      <Button
        color={Colors.primary}
        title={!showDetails ? 'Show details' : 'Hide details'}
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails && (
        <View>
          {props.items.map((cartItem, idx) => (
            <CartItem
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.title}
              deletable={false}
              key={`cartItem${idx}`}
            />
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  orderItem: {
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
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
});
export default OrderItem;
