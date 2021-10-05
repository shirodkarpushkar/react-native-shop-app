import React, {useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch()
    
    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName="md-cart"
              onPress={() => props.navigation.navigate("Cart")}
            />
          </HeaderButtons>
        ),
      });
    });

  const listItemRender = ({item}) => {
    return (
      <ProductItem
        image={item.imageUrl}
        title={item.title}
        price={item.price}
        onView={() => props.navigation.navigate("ProductDetails",{productId:item.id})}
        onAddToCart={() => {dispatch(cartActions.addToCart(item))}}
      />
    );
  };

  return <FlatList data={products} renderItem={listItemRender} />;
};
export default ProductsOverviewScreen;
