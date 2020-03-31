import { put, takeLatest, call, all } from "redux-saga/effects";
// import Matomo from "react-native-matomo";
import Api from "../api/api";
import {
  loadedProfile,
  requestProfileFailed,
  profileAction,
  getPlaceUserByLocationSuccess
} from "../actions/profile.action";
import {
  UPDATE_FAVORITE_CATEGORY_ASYNC,
  GET_FAVORITE_CATEGORIES_ASYNC,
  CHECK_FAVORITE_CATEGORIES_ASYNC,
  GET_USER_LOCATION_ASYNC
} from "../actions/actionTypes";
import { invoke } from "../helpers/sagas.helper";
import { callbackSuccess, callbackError } from "../helpers/callback";

function* fetchProfile() {
  try {
    const response = yield call(Api.getProfile);
    // Matomo.setUserId(response.data.id);
    yield put(loadedProfile(response.data));
  } catch (err) {
    yield put(requestProfileFailed());
  }
}

function* getPlaceUserLocation({ payload }) {
  const { showLoading = false, lat, lng, callback } = payload || {};
  yield invoke(
    function* execution() {
      const response = yield call(Api.getMyPlaceByLocation, { lat, lng });
      yield put(getPlaceUserByLocationSuccess(response));
      callbackSuccess(payload, response);
    },
    callback
      ? function* handleError(err) {
          if (typeof callback === "function") yield callbackError(payload, err);
        }
      : null,
    showLoading
  );
}

function* updateFavoriteCategorySaga({ payload }) {
  const { showLoading = true } = payload || {};
  yield invoke(
    function* execution() {
      const { slug, isFavorite } = payload || {};

      const data = yield call(Api.updateFavoriteCategory, {
        slug,
        isFavorite
      });
      callbackSuccess(payload, data);
    },
    null,
    showLoading
  );
}

function* getFavoriteCategoriesSaga({ payload }) {
  const { showLoading = true, callback, onSuccess, ...dataRequest } = payload || {};
  yield invoke(
    function* execution() {
      const data = yield call(Api.getFavoriteCategories, dataRequest);
      callbackSuccess(payload, data);
    },
    null,
    showLoading
  );
}

function* checkFavoriteCategorySaga({ payload }) {
  const { showLoading = false } = payload || {};
  yield invoke(
    function* execution() {
      const { slug } = payload || {};
      const data = yield call(Api.checkFavoriteCategory, { slug });
      yield callbackSuccess(payload, data);
    },
    null,
    // function* handleError(err) {
    //   yield callbackError(payload, err);
    // },
    showLoading
  );
}

export function* watchProfileSaga() {
  yield all([
    takeLatest(profileAction.PROFILE_REQUESTED, fetchProfile),
    takeLatest(GET_USER_LOCATION_ASYNC.REQUEST, getPlaceUserLocation),
    takeLatest(UPDATE_FAVORITE_CATEGORY_ASYNC.REQUEST, updateFavoriteCategorySaga),
    takeLatest(GET_FAVORITE_CATEGORIES_ASYNC.REQUEST, getFavoriteCategoriesSaga),
    takeLatest(CHECK_FAVORITE_CATEGORIES_ASYNC.REQUEST, checkFavoriteCategorySaga)
  ]);
}
