export const EDIT_PRODUCT = 'EDIT_PRODUCT';

export const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  };
};
