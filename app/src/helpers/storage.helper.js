import AsyncStorage from '@react-native-community/async-storage';

const FCM_TOKEN = 'fcm_token';
const KEY_PROFILE = 'profile';
const KEY_TOKEN = 'access_token';
const KEY_CART = 'cart';
const KEY_SELECTED_AGENCY = 'selected_agency';

const KEY_USERNAME = 'username';
const KEY_PASSWORD = 'password';

export const saveFCMToken = fCMToken =>
  AsyncStorage.setItem(FCM_TOKEN, fCMToken);

export const getFCMToken = () => {
  return AsyncStorage.getItem(FCM_TOKEN);
};

export const saveToken = token => AsyncStorage.setItem(KEY_TOKEN, token);

export const getToken = () => {
  return AsyncStorage.getItem(KEY_TOKEN);
};

export const removeToken = () => AsyncStorage.removeItem(KEY_TOKEN);

export const saveCart = cart => AsyncStorage.setItem(KEY_CART, cart);

export const getCart = () => {
  return AsyncStorage.getItem(KEY_CART);
};

export const removeCart = () => AsyncStorage.removeItem(KEY_CART);

export const saveProfile = profile =>
  AsyncStorage.setItem(KEY_PROFILE, JSON.stringify(profile));

export const getProfile = async () => {
  const text = await AsyncStorage.getItem(KEY_PROFILE);
  return text ? JSON.parse(text) : null;
};

export const removeProfile = () => AsyncStorage.removeItem(KEY_PROFILE);

export const saveSelectedAgency = agency =>
  AsyncStorage.setItem(KEY_SELECTED_AGENCY, JSON.stringify(agency));

export const getSelectedAgency = async () => {
  const text = await AsyncStorage.getItem(KEY_SELECTED_AGENCY);
  return text ? JSON.parse(text) : null;
};

export const removeSelectedAgency = () =>
  AsyncStorage.removeItem(KEY_SELECTED_AGENCY);

export const saveUsername = username =>
  AsyncStorage.setItem(KEY_USERNAME, username);

export const getUsername = () => {
  return AsyncStorage.getItem(KEY_USERNAME);
};

export const savePassword = password =>
  AsyncStorage.setItem(KEY_PASSWORD, password);

export const getPassword = () => {
  return AsyncStorage.getItem(KEY_PASSWORD);
};
