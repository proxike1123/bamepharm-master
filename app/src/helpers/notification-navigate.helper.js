let didNavigate = false;

export const updateDidNavigate = value => {
  didNavigate = value;
};

export const getDidNavigate = () => {
  return didNavigate;
};
