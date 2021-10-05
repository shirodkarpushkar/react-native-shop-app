import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

import {NavigationContainer} from '@react-navigation/native';

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: 'white',
};
const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{
          title: 'All Products',
        }}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};
const Container = () => {
  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};
export default Container;
