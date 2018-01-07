import {injectReducer, injectSaga} from '../../store/reducers';

export default (store) => ({
  path: 'registration',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Registration = require('./registration.container').default;
      const reducer = require('./registration.module').default;
      injectReducer(store, {
        key: 'registration',
        reducer
      });
      injectSaga(store, require('./registration.module').registrationSaga);
      cb(null, Registration);
    }, 'registration');
  }
});
