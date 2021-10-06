import PRODUCTS from '../../data/dummy-data';
import {DELETE_PRODUCT} from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const {id} = action.product;
      console.log("🚀 ~ file: products.js ~ line 12 ~ id", id)
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
    default:
      return {...state};
  }
};
