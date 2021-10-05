import React, {useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

  const listItemRender = ({item}) => {
    return (
      <ProductItem
        image={item.imageUrl}
        title={item.title}
        price={item.price}
        onView={() => {}}
        onAddToCart={() => {}}
      />
    );
  };

  return <FlatList data={products} renderItem={listItemRender} />;
};
export default ProductsOverviewScreen;
