import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import CartItem from '../../models/cartItem';
const initialState = {
  items: [],
  totalAmount: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const {product} = action;
      const price = product.price;
      const title = product.title;
      let cartItem = state.items.find(el => el.title === product.title);

      if (cartItem) {
        const updatedCartItem = new CartItem(
          cartItem.quantity + 1,
          cartItem.price,
          cartItem.title,
          cartItem.sum + cartItem.price,
        );

        const filteredCartItems = state.items.filter(
          el => el.title !== product.title,
        );

        return {
          ...state,
          items: [...filteredCartItems, updatedCartItem],
          totalAmount: state.totalAmount + price,
        };
      } else {
        const newCartItem = new CartItem(1, price, title, price);
        return {
          ...state,
          items: [...state.items, newCartItem],
          totalAmount: state.totalAmount + price,
        };
      }
    case REMOVE_FROM_CART:
      const productToRemove = action.product;
      if (productToRemove.quantity > 1) {
        const updatedCItem = new CartItem(
          productToRemove.quantity - 1,
          productToRemove.price,
          productToRemove.title,
          productToRemove.sum - productToRemove.price,
        );
        const filterItems = state.items.filter(
          el => el.title !== productToRemove.title,
        );

        return {
          ...state,
          items: [...filterItems, updatedCItem],
          totalAmount: state.totalAmount - productToRemove.price,
        };
      } else {
        const filteredItems = state.items.filter(
          el => el.title !== productToRemove.title,
        );
        return {
          ...state,
          items: [...filteredItems],
          totalAmount: state.totalAmount - productToRemove.price,
        };
      }

    default:
      return state;
  }
};
