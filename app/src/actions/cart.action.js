export const cartAction = {
  CART_ADD_TO_CART: "CART_ADD_TO_CART",
  CART_LOAD_CART: "CART_LOAD_CART",
  CART_UPDATE_CART: "CART_UPDATE_CART",
  CART_REMOVE_PRODUCT: "CART_REMOVE_PRODUCT",
};

export const addToCart = product => {
  return {
    type: cartAction.CART_ADD_TO_CART,
    payload: {
      product
    }
  };
};

export const loadCart = cart => {
  return {
    type: cartAction.CART_LOAD_CART,
    payload: {
      cart
    }
  };
};

export const updateCart = product => {
    return {
        type: cartAction.CART_UPDATE_CART,
        payload: {
            product
        }
    }
};

export const removeProduct = product => {
    return {
        type: cartAction.CART_REMOVE_PRODUCT,
        payload: {
            product
        }
    }
};
