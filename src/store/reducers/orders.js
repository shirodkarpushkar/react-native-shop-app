import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
  
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const { order } = action
            const id = Date.now()
            const date = new Date()
            const newOrder = new Order(id, order.items, order.amount, date)
            return {
                ...state, orders: [...state.orders, newOrder]
            }
            
            
    
        default:
            return {...state}
    }
}
