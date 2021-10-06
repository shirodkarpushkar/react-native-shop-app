export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const deleteProduct = product => {
  return {type: DELETE_PRODUCT, product};
};
