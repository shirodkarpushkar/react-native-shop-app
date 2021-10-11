import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/Colors';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import UserProductsScreen from '../screens/user/UserProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import SignupScreen from '../screens/user/SignupScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import EditProductScreen from '../screens/user/EditProductsScreen';
import {useSelector} from 'react-redux';

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: 'white',
};
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
const OrdersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Your Orders',
        }}
      />
    </Stack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={{
          title: 'Your Products',
        }}
      />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.accent,
      }}>
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          title: 'All Products',
          drawerIcon: config => (
            <Icon size={23} color={config.color} name="md-cart" />
          ),
        }}
      />
      <Drawer.Screen
        name="OrdersOverview"
        component={OrdersNavigator}
        options={{
          title: 'Your Orders',
          drawerIcon: config => (
            <Icon size={23} color={config.color} name="md-list" />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          title: 'Admin',
          drawerIcon: config => (
            <Icon size={23} color={config.color} name="md-create" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{
          title: 'Register New User',
        }}
      />
    </Stack.Navigator>
  );
};

const Container = () => {
  const auth = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      {!auth && <AuthNavigator />}
      {auth && <DrawerNavigator />}
    </NavigationContainer>
  );
};
export default Container;
