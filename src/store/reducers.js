import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import locationReducer from './location';
import loginReducer from '../routes/login/login.module';
import coreLayoutReducer from '../core/layout.component/layout.module';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    login: loginReducer,
    form: formReducer,
    layout: coreLayoutReducer,
    ...asyncReducers
  });
};

export const injectSaga = (store, saga) => {
  if (store.runSaga) {
    store.runSaga(saga);
  }
};

export const injectReducer = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
