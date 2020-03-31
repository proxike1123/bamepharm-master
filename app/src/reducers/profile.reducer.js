import {profileAction} from '../actions/profile.action';

const initialState = {
  profile: {},
  loading: false,
  loadFailed: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileAction.PROFILE_RESETED:
      return {
        ...state,
        profile: {},
        loading: false,
        loadFailed: false,
      };
    case profileAction.PROFILE_LOADED:
      return {
        ...state,
        profile: {...state.profile, ...action.payload.profile},
        loading: false,
        loadFailed: false,
      };
    case profileAction.PROFILE_REQUESTED:
      return {...state, loading: true, loadFailed: false};
    case profileAction.PROFILE_REQUEST_FAILED:
      return {...state, loading: false, loadFailed: true};
    default:
      return state;
  }
};
