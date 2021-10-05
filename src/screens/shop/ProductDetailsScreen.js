import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const ProductDetailsScreen = props => {
  const {productId} = props.route.params;
  const availableProducts = useSelector(
    state => state.products.availableProducts,
  );
  const product = availableProducts.find(el => el.id === productId);
  useEffect(() => {
    props.navigation.setOptions({
      title: product.title,
    });
  });
  return (
    <View style={styles.screen}>
      <Text>ProductDetailsScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProductDetailsScreen;
