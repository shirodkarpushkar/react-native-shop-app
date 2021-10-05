import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
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
          title: 'Products',
        }}
      />
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
