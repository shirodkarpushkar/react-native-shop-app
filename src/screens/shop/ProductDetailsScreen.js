import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailsScreen = props => {
  const {productId} = props.route.params;
  const availableProducts = useSelector(
    state => state.products.availableProducts,
  );
    const product = availableProducts.find(el => el.id === productId);
    const dispatch = useDispatch()
    
  useEffect(() => {
    props.navigation.setOptions({
      title: product.title,
    });
  });
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: product.imageUrl}} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => { dispatch(cartActions.addToCart(product))}} />
      </View>
      <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical:20
  },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal:20
    },
    actions: {
        marginVertical: 10,
        alignItems:"center"
    }
});
export default ProductDetailsScreen;
