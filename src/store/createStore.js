import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import createSagaMiddleware from 'redux-saga';

import {loginSaga} from '../routes/login/login.module';
import makeRootReducer from './reducers';
import {updateLocation} from './location';

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [thunk, sagaMiddleware];
  const enhancers = [];
  let composeEnhancers = compose;
  if (webpackGlobal.__ENV__ === 'dev') {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  sagaMiddleware.run(loginSaga);
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
