import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = (props) => {
    const products = useSelector(state=>state.products.ava)
    return (<FlatList />)
}