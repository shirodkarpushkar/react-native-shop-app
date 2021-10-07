import React, {useEffect, useState} from 'react';
import {FlatList, View, Text,Button} from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch()
  
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
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName="md-cart"
              onPress={() => props.navigation.navigate('Cart')}
            />
          </HeaderButtons>
        ),
      });
    });
  useEffect(() => {
    dispatch(productActions.fetchProducts());
  },[dispatch]);

  const listItemRender = ({item}) => {
    return (
      <ProductItem
        image={item.imageUrl}
        title={item.title}
        price={item.price}
        >
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={() =>
            props.navigation.navigate('ProductDetails', {productId: item.id})
          }
        />
        <Button
          color={Colors.primary}
          title="to Cart"
          onPress={() => dispatch(cartActions.addToCart(item))}
        />
      </ProductItem>
    );
  };

  return <FlatList data={products} renderItem={listItemRender} />;
};
export default ProductsOverviewScreen;
