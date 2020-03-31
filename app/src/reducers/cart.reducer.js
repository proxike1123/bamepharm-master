import { cartAction } from "../actions/cart.action";
import { saveCart } from "../helpers/storage.helper";

const initialState = {
  cart: [],
  loading: false,
  loadFailed: false
};

export const cartReducer = (state: {} = initialState, action: {}) => {
  switch (action.type) {
    case cartAction.CART_ADD_TO_CART:
      let cartStore = state.cart;
      if (!cartStore) {
        cartStore = [];
      }
      const existProduct = cartStore.find(
        e => e.id == action.payload.product.id
      );

      let cart;
      if (existProduct) {
        existProduct.products = action.payload.product.products;
        cart = cartStore.map(e => {
          if (e.id == existProduct.id) {
            return existProduct;
          }
          return e;
        });
      } else {
        cart = [action.payload.product, ...cartStore];
      }
      saveCart(JSON.stringify(cart));


      return {
        ...state,
        cart
      };

    case cartAction.CART_LOAD_CART:
      return {
        ...state,
        cart: action.payload.cart
      };

    case cartAction.CART_UPDATE_CART:

      return;
    case cartAction.CART_REMOVE_PRODUCT:
      let cartRemove = state.cart;
      cartRemove = cartRemove.filter(item => item.id !== action.payload.product.id);
      saveCart(JSON.stringify(cartRemove));

      return {
        ...state,
        cart: cartRemove
      };
    default:
      return state;
  }
};
