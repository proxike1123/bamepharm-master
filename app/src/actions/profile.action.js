export const profileAction = {
  PROFILE_LOADED: "PROFILE_LOADED",
  PROFILE_RESETED: "PROFILE_RESETED",
  PROFILE_REQUESTED: "PROFILE_REQUESTED",
  PROFILE_REQUEST_FAILED: "PROFILE_REQUEST_FAILED"
};

export const loadedProfile = profile => {
  return {
    type: profileAction.PROFILE_LOADED,
    payload: {
      profile
    }
  };
};

export const resetProfile = () => {
  return {
    type: profileAction.PROFILE_RESETED
  };
};

export const requestedProfile = () => {
  return {
    type: profileAction.PROFILE_REQUESTED
  };
};

export const requestProfileFailed = () => {
  return {
    type: profileAction.PROFILE_REQUEST_FAILED
  };
};
