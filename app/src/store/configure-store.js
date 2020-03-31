import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/root.saga';
import {navReducer} from '../reducers/nav.reducer';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import {cartReducer} from '../reducers/cart.reducer';
import {profileReducer} from '../reducers/profile.reducer';

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const configureStore = () => {
  const appReducers = combineReducers({
    nav: navReducer,
    profile: profileReducer,
    cart: cartReducer
  });
  const store = createStore(appReducers, applyMiddleware(middleware), enhancer);

  sagaMiddleware.run(rootSaga);

  return {store};
};

export default configureStore;
