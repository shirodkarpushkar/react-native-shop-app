import {ADD_TO_CART} from '../actions/cart';
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
      let cartItem = state.items.find(el => el.id === product.id);

      if (cartItem) {
        const updatedCartItem = new CartItem(
          cartItem.quantity + 1,
          cartItem.price,
          cartItem.title,
          cartItem.sum + cartItem.price,
        );
        const idx = state.items.findIndex(el => el.id === product.id);
        const cartItems = [...state.items];
        const filteredCartItems = cartItems.splice(idx, 1);
       

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

    default:
      return state;
  }
};
