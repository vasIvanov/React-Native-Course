import PRODUCTS from '../../data/dummy-data';
import { EDIT_PRODUCT } from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PRODUCT:
      const prodIndex = state.availableProducts.findIndex(
        (p) => p.id === action.product.id
      );
      console.log('index', prodIndex);
      let products = state.availableProducts;
      products.splice(prodIndex, 1);

      products.splice(prodIndex, 0, action.product);
      console.log('products', products);

      const newState = {
        ...state,
        availableProducts: products,
      };
      return newState;

    default:
      return state;
  }
};
