import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        userProducts: action.products,
        availableProducts: action.products,
      };
    case DELETE_PRODUCT:
      const {id} = action.product;
      console.log('🚀 ~ file: products.js ~ line 12 ~ id', id);
      const filteredProducts = state.userProducts.filter(
        product => product.id !== id,
      );
      const filteredAvailableProducts = state.availableProducts.filter(
        product => product.id !== id,
      );
      return {
        ...state,
        userProducts: filteredProducts,
        availableProducts: filteredAvailableProducts,
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.product.id,
        'u1',
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        action.product.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.product.id,
      );
      const existingProducts = [...state.userProducts];
      const existingAvailableProducts = [...state.availableProducts];

      const existingProduct = existingProducts[productIndex];
      const existingAvailableProduct = existingAvailableProducts.find(
        prod => prod.id === action.product.id,
      );

      const updatedProduct = new Product(
        action.product.id,
        existingProduct.ownerId,
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        existingProduct.price,
      );

      existingProduct.title = updatedProduct.title;
      existingProduct.description = updatedProduct.description;
      existingProduct.imageUrl = updatedProduct.imageUrl;

      existingAvailableProduct.title = updatedProduct.title;
      existingAvailableProduct.description = updatedProduct.description;
      existingAvailableProduct.imageUrl = updatedProduct.imageUrl;
      return {
        ...state,
        userProducts: [...existingProducts],
        availableProducts: [...existingAvailableProducts],
      };
    default:
      return {...state};
  }
};
