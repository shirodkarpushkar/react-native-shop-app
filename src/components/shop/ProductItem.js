import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

const ProductItem = props => {
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableNativeFeedback onPress={props.onView}>
          <Image source={{uri: props.image}} style={styles.image} />
          <View style={styles.productDetails}>
            <Text style={styles.title}>{props.title} </Text>
            <Text style={styles.price}>${Number(props.price).toFixed(2)}</Text>
          </View>

          <View style={styles.buttons}>
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={props.onView}
            />
            <Button
              color={Colors.primary}
              title="to Cart"
              onPress={props.onAddToCart}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
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
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  productDetails: {
    alignItems: 'center',
    height: '20%',
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '20%',
  },
  touchable: {
    overflow: 'hidden',
  },
});
export default ProductItem;
