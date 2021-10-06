import React from 'react';
import {FlatList, Button, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', {productId: id});
  };

    return (
      <FlatList
        data={userProducts}
        renderItem={({item}) => (
          <ProductItem
            image={item.imageUrl}
            title={item.title}
            price={item.price}
            onSelect={() => {
              editProductHandler(item.id);
            }}>
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => {
                editProductHandler(item.id);
              }}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => {
                dispatch(productsActions.deleteProduct(item.id));
              }}
            />
          </ProductItem>
        )}
      />
    );
};

export default UserProductsScreen;
