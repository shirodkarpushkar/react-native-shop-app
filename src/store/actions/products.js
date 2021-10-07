import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    const response = await fetch(
      'https://rn-shop-app-7921f-default-rtdb.firebaseio.com/products.json',
    );
    const res = await response.json();
    const products = Object.keys(res).map(
      id =>
        new Product(
          id,
          'u1',
          res[id].title,
          res[id].imageUrl,
          res[id].description,
          res[id].price,
        ),
    );
    dispatch({ type: SET_PRODUCTS, products });
    console.log('dispatch')
  };
};

export const deleteProduct = product => {
  return {type: DELETE_PRODUCT, product};
};
export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    const data = {
      title,
      description,
      imageUrl,
      price,
    };
    const response = await fetch(
      'https://rn-shop-app-7921f-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    const res = await response.json();
    console.log(
      '🚀 ~ file: products.js ~ line 26 ~ returnasync ~ result',
      res.name,
    );
    data.id = res.name;
    dispatch({
      type: CREATE_PRODUCT,
      product: data,
    });
  };
};
export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    product: {
      id,
      title,
      description,
      imageUrl,
    },
  };
};
